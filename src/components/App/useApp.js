import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getFormattedWeatherData } from "../../services/utils";
import { db } from "../../firebase-config";

export const useApp = () => {
    const [query, setQuery] = useState({ q: "London" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);
    const [weatherHistory, setWeatherHistory] = useState([]);

    const recordWeatherHistory = (weatherData) => {
        const uniqueId =
            weatherData.country + weatherData.name + weatherData.dt;

        setDoc(doc(db, "history", uniqueId), weatherData).catch((err) => {
            console.log(err);
        });
    };

    const getWeatherHistory = () => {
        const historyCollectionRef = collection(db, "history");

        getDocs(historyCollectionRef)
            .then((result) => {
                const formattedHistory = result.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));

                setWeatherHistory(formattedHistory);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        const message = query.q ? query.q : "your location";

        toast.info("Getting the data for " + message);

        getFormattedWeatherData({ ...query, units })
            .then((data) => {
                getWeatherHistory();
                recordWeatherHistory(data);
                setWeather(data);

                toast.success(
                    `Data received for ${data.name}, ${data.country}`
                );
            })
            .catch((err) => {
                toast.error("Failed to fetch data 😓");
                console.log(err);
            });
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
