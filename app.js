const user = document.getElementById("user")
const login = document.getElementById("login")
const table = document.querySelectorAll(".display")

//  = function () {
//     //  table.attr('hidden', false);
//     const val = user.value
//     document.write(val)
// };
//let table = document.getElementById("dataTable");
const getFacts = async () => {
    const response = await fetch('http://localhost:3000/employees', {
        method: "POST",
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)
            // let rows = '';
            // data.forEach(element => {
            //     rows += `<tr> <td>${element.period}</td><td>${element.day}</td> <td>${element.section}</td>  </tr>`
            // })
            // document.getElementById("dataTable").innerHTML = rows;
        })
        .catch(err => {
            console.log("error")
        })
};

document.getElementById("login").addEventListener("click", () => {
    document.write(user.value)
})