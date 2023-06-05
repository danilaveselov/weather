import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getFormattedWeatherData } from "../../services/utils";
import { db } from "../../firebase-config";

export const useApp = () => {
    const [query, setQuery] = useState({ q: "London" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);

    // weatherHistory useState for displaying in HistoryTable component
    const [weatherHistory, setWeatherHistory] = useState([]);

    useEffect(() => {
        // Adding a new record to the firebase db
        const recordWeatherHistory = async (weatherData) => {
            const uniqueId =
                weatherData.country + weatherData.name + weatherData.dt;
            await setDoc(doc(db, "history", uniqueId), weatherData).catch(
                (err) => {
                    console.log(err);
                }
            );
        };
        // Getting history data from the firebase db
        const getWeatherHistory = async () => {
            const historyCollectionRef = collection(db, "history");
            const history = await getDocs(historyCollectionRef);
            const formattedHistory = history.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setWeatherHistory(formattedHistory);
        };
        // Fetching the weather from OpenWeather, recording it and setting the required useStates
        const fetchWeather = async () => {
            const message = query.q ? query.q : "your location";
            toast.info("Getting the data for " + message);
            await getFormattedWeatherData({ ...query, units })
                .then((data) => {
                    toast.success(
                        `Data received for ${data.name}, ${data.country}`
                    );
                    recordWeatherHistory(data);
                    getWeatherHistory();
                    setWeather(data);
                })
                .catch((err) => {
                    toast.error("Failed to fetch data 😓");
                });
        };
        fetchWeather();
    }, [query, units]);

    return {
        query,
        setQuery,
        units,
        setUnits,
        weather,
        setWeather,
        weatherHistory,
    };
};
