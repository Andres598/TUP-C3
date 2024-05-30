const { useState, useEffect } = React;

const apiKey = 'd5e62c8e3ef2c4a7ee50b3b5f0ae521c';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const cities = ['Tucumán', 'Salta', 'Buenos Aires'];

    const fetchWeather = async (cityName) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=es`);
        const data = await response.json();
        setWeatherData(data);
    };

    useEffect(() => {
        // Ciudad de por defecto
        fetchWeather('Tucumán');
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (city) {
            fetchWeather(city);
        }
    };

    return (
        <div>
            <div className="cabecera">
                <h1>Clima</h1>
                <div>
                    {cities.map((cityName) => (
                        <button key={cityName} onClick={() => fetchWeather(cityName)}>
                            {cityName}
                        </button>
                    ))}
                </div>
            </div>
            <form onSubmit={handleSearch}>
                <input
                    type="search"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Buscar ciudad"
                    aria-label="Search"
                />
            </form>
            {weatherData && (
                <div className="panelClima">
                    <h2>{weatherData.name}</h2>
                    <div className="icono">
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon" />
                    </div>
                    <h1>Temp: {weatherData.main.temp} °C</h1>
                    <p>Mínima: {weatherData.main.temp_min} °C / Máxima: {weatherData.main.temp_max} °C</p>
                    <p>Humedad: {weatherData.main.humidity}%</p>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<WeatherApp />, document.getElementById('root'));
