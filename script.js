const form = document.querySelector(".form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.getElementById("search-input").value;

  let element = Array.from(document.getElementsByTagName("p"));
  element.forEach(function (item) {
    console.log(item);
    item.innerHTML = '<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>';
  });

  async function fetchData() {
    const url = "https://covid-193.p.rapidapi.com/statistics?country=" + input;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "5a58abee7fmsh8e45eaa9a3a30dfp14f103jsn0d5c442e5c0d",
        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      let activeValue = result.response[0].cases.active;
      let newValue = result.response[0].cases.new;
      let recoveredValue = result.response[0].cases.recovered;
      let totalValue = result.response[0].cases.total;
      let deathsValue = result.response[0].deaths.total;
      let testsValue = result.response[0].tests.total;

      let data = ["active", "new", "recovered", "total", "deaths", "tests"];
      data.forEach(function (item) {
        let element = document.getElementById(item);

        element.innerHTML = eval(item + "Value") ?? "0";
      });
    } catch (error) {
      console.error(error);
    }
  }

  fetchData();
});
