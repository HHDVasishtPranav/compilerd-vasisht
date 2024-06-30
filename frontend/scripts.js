// document.getElementById('codeForm').addEventListener('submit', async function(event) {
//     event.preventDefault();

//     const language = document.getElementById('language').value;
//     const code = document.getElementById('code').value;

//     const response = await fetch('http://localhost:3000/api/execute/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ language, script: code })
//     });

//     const result = await response.json();
//     document.getElementById('output').textContent = JSON.stringify(result, null, 2);
// });

document.getElementById('codeForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const language = document.getElementById('language').value;
    const code = document.getElementById('codeeditor').value;
    const stdin = document.getElementById('stdin').value;

    const response = await fetch('http://localhost:3000/api/execute/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ language, script: code, stdin })
    });

    const result = await response.json();
    const statusCode = result.status_code;

    let formattedOutput = `
<span class="blue-text">Output: ${result.output.trim()}</span>
        `;

    if (result.errorMessage) {
        formattedOutput += `\n<span class="red-text">Error Message: ${result.errorMessage}</span>`;
    }

    if (result.status_code === 200) {
        formattedOutput += `\n<span class="green-text">Status Code: ${result.status_code}</span>`;
    } else {
        formattedOutput += `\n<span class="red-text">Status Code: ${result.status_code}</span>`;
    }
    console.log(result.status_code);

    if (result.compileMessage) {
        formattedOutput += `\n<span class="red-text">Compile Message: ${result.compileMessage}</span>`;
    }

    document.getElementById('output').innerHTML = formattedOutput.trim();

});

