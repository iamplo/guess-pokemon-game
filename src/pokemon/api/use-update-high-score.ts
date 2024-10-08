// Mock a  PUT request
function useUpdateHighScore() {
  const url = "https://vy7gr.wiremockapi.cloud/json/1";

  const mutate = async (value: number) => {
    const request = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ highScore: value }),
    });
    const response = await request.json();
    return response;
  };

  return { mutate };
}

export default useUpdateHighScore;
