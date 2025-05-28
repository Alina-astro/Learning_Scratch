export const fetchProgress = async email => {
  try {
    const response = await fetch(
      `https://learningscratchbackend-production.up.railway.app/api/progress/${email}`
    );
    if (!response.ok) throw new Error("Ошибка загрузки прогресса");
    return await response.json();
  } catch (err) {
    console.error("Ошибка получения прогресса:", err);
    return null;
  }
};
