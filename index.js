const form = document.getElementById("userForm");

const date = document.getElementById("dob");

const validDate = () => {
  const dob = new Date(date.value);
  const today = new Date();

  let age;

  const year = today.getFullYear() - dob.getFullYear();
  const month = today.getMonth() - dob.getMonth();
  const day = today.getDate() - dob.getDate();

  if (month < 0 || (month === 0 && day < 0)) {
    age = year - 1;
  } else {
    age = year;
  }

  if (age < 18 || age > 55) {
    date.setCustomValidity("Age must be between 18 and 55");
  } else {
    date.setCustomValidity("");
  }
  date.reportValidity();
};

date.addEventListener("input", validDate);

const getData = () => {
  let getEntries = localStorage.getItem("UserData");
  if (getEntries) {
    getEntries = JSON.parse(getEntries);
  } else {
    getEntries = [];
  }
  return getEntries;
};

const tableDisplay = () => {
  const entries = getData();
  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class="px-4 py-2 text-gray-700 font-semibold border">${entry.name}</td>`;
      const emailCell = `<td class="px-4 py-2 text-gray-700 font-semibold border">${entry.email}</td>`;
      const passwordCell = `<td class="px-4 py-2 text-gray-700 font-semibold border">${entry.password}</td>`;
      const dobCell = `<td class="px-4 py-2 text-gray-700 font-semibold border">${entry.dob}</td>`;
      const acceptCell = `<td class="px-4 py-2 text-gray-700 font-semibold border">${entry.accept}</td>`;

      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptCell}</tr>`;

      return row;
    })
    .join("\n");

  const table = `
  <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
    <thead class="bg-gray-700 text-white">
      <tr>
        <th class="px-4 py-2 border">Name</th>
        <th class="px-4 py-2 border">Email</th>
        <th class="px-4 py-2 border">Password</th>
        <th class="px-4 py-2 border">Dob</th>
        <th class="px-4 py-2 border">Accepted terms?</th>
      </tr>
    </thead>
    <tbody>
      ${tableEntries}
    </tbody>
  </table>`;

  let displayTable = document.getElementById("dataTable");
  displayTable.innerHTML = table;
};

const saveData = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const accept = document.getElementById("accept").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    accept,
  };

  let entries = getData();

  entries.push(entry);

  localStorage.setItem("UserData", JSON.stringify(entries));

  tableDisplay();

  form.reset();
};

form.addEventListener("submit", saveData);

tableDisplay();
