import * as Calendar from "expo-calendar";
import { Platform } from "react-native";
import * as ReportService from "../Report/ReportService";
import { getAuthToken } from "../Auth/AuthService";
import AxiosInstance from "../../api/AxiosInstance";

const MYPENNYS_CALENDAR_NAME = "MyPennys Calendar";

const addTransactionToCalendar = async (transaction, t) => {
  try {
    const { status } = await Calendar.requestCalendarPermissionsAsync();

    if (status !== "granted") {
      console.log("Calendar permission not granted");
      return;
    }

    const calendarId = await getOrCreateCalendar(t);

    if (!calendarId) {
      console.log("Calendar not created or found.");
      return;
    }
    const [categories, wallets, user] = await Promise.all([
      ReportService.getCategories(t),
      ReportService.getWallets(t),
      getUser(t),
    ]);

    const category = categories.find((c) => c.id === transaction.categorie_id);
    const wallet = wallets.find((w) => w.id === transaction.wallet_id);

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

    await Calendar.createEventAsync(calendarId, eventDetails);
    console.log("Transaction added to calendar.");
  } catch (error) {
    console.error("Error adding transaction to calendar:", error);
    throw new Error(t("calendarService.calendarSaveError") + error.message);
  }
};

const getOrCreateCalendar = async (t) => {
  try {
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );

    let myCalendar = calendars.find(
      (cal) => cal.title === MYPENNYS_CALENDAR_NAME
    );

    if (myCalendar) {
      return myCalendar.id;
    }

    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "MyPennys" };

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
    console.error("Error creating calendar:", error);
    throw new Error(t("calendarService.calendarError") + error.message);
  }
};

const getDefaultCalendarSource = async () => {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
};

const getUser = async (t) => {
  try {
    const user = await getAuthToken();
    if (!user || !user.id) {
      throw new Error(t("authService.messageNoAuth"));
    }
    const response = await AxiosInstance.get(`/users/${user.id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error(t("authService.messageErrorLogin"));
  }
};

export { addTransactionToCalendar };
