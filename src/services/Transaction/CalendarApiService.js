import * as Calendar from "expo-calendar";
import { Platform } from "react-native";
import * as ReportService from "../Report/ReportService";
import { getAuthToken } from "../Auth/AuthService";
import AxiosInstance from "../../api/AxiosInstance";

// Define calendar name
const MYPENNYS_CALENDAR_NAME = "MyPennys Calendar";

// Function to add a transaction to the calendar
const addTransactionToCalendar = async (transaction, t) => {
  try {
    // Request calendar permissions
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    // Check if permission is granted
    if (status !== "granted") {
      console.log("Calendar permission not granted");
      return;
    }
    // Get or create a calendar for MyPennys
    const calendarId = await getOrCreateCalendar(t);
    // If the calendar is not created or found, exit
    if (!calendarId) {
      console.log("Calendar not created or found.");
      return;
    }
    // Get categories, wallets and user information
    const [categories, wallets, user] = await Promise.all([
      ReportService.getCategories(t),
      ReportService.getWallets(t),
      getUser(t),
    ]);
    // Find the category and wallet related to the transaction
    const category = categories.find((c) => c.id === transaction.categorie_id);
    const wallet = wallets.find((w) => w.id === transaction.wallet_id);
    // Set up the event details
    const categoryName = category ? category.name : t("general.unknown");
    const walletName = wallet ? wallet.name : t("general.unknown");
    const userName = user ? user.username : t("general.unknown");

    const eventDetails = {
      title:
        transaction.type === "income"
          ? t("calendarService.incomeEvent")
          : t("calendarService.expenseEvent"),
      startDate: new Date(transaction.date),
      endDate: new Date(transaction.date),
      notes: `${t("calendarService.amount")}: $${transaction.amount}\n${t(
        "calendarService.category"
      )}: ${categoryName}\n${t("calendarService.wallet")}: ${walletName}\n${t(
        "calendarService.user"
      )}: ${userName}`,
      calendarId: calendarId,
    };
    // Add the event to the calendar
    await Calendar.createEventAsync(calendarId, eventDetails);
    console.log("Transaction added to calendar.");
  } catch (error) {
    // Handle errors
    console.error("Error adding transaction to calendar:", error);
    throw new Error(t("calendarService.calendarSaveError") + error.message);
  }
};

// Function to get or create the calendar
const getOrCreateCalendar = async (t) => {
  try {
    // Get all calendars
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    // Check if the calendar already exists
    let myCalendar = calendars.find(
      (cal) => cal.title === MYPENNYS_CALENDAR_NAME
    );

    if (myCalendar) {
      return myCalendar.id;
    }
    // Get default calendar source
    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "MyPennys" };
    // If calendar does not exist, create one
    const newCalendar = {
      title: MYPENNYS_CALENDAR_NAME,
      color: "blue",
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: MYPENNYS_CALENDAR_NAME,
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      ownerAccount: "MyPennys",
    };

    const newCalendarId = await Calendar.createCalendarAsync(newCalendar);
    return newCalendarId;
  } catch (error) {
    // Handle errors
    console.error("Error creating calendar:", error);
    throw new Error(t("calendarService.calendarError") + error.message);
  }
};

// Function to get the default calendar source
const getDefaultCalendarSource = async () => {
  // Get the default calendar
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
};

// Function to get user info
const getUser = async (t) => {
  try {
    // Get user information
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("authService.messageNoAuth"));
    }
    const response = await AxiosInstance.get(`/users/${user.id}`);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error fetching user:", error);
    throw new Error(t("authService.messageErrorLogin"));
  }
};

// Export function to add event to calendar
export { addTransactionToCalendar };
