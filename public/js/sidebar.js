document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});

function nextStep(step) {
    document.getElementById(`step-${step}`).style.display = 'none';
    document.getElementById(`step-${step + 1}`).style.display = 'block';
    document.querySelector(`.step:nth-child(${step + 1})`).classList.add('completed');
}
