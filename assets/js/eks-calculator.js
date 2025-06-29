document.getElementById("eksCostForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const workerNodeSelect = document.getElementById("workerNode");
  const selectedOption = workerNodeSelect.options[workerNodeSelect.selectedIndex];
  const podCount = parseFloat(document.getElementById("podCount").value);
  const cpuPerPod = parseFloat(document.getElementById("cpuPerPod").value);
  const memoryPerPod = parseFloat(document.getElementById("memoryPerPod").value);

  if (!selectedOption.value) {
    alert("Please select a worker node type.");
    return;
  }

  const instance = {
    type: selectedOption.value,
    cpu: parseFloat(selectedOption.dataset.cpu),
    memory: parseFloat(selectedOption.dataset.memory),
    hourly: parseFloat(selectedOption.dataset.hourly)
  };

  const totalCPU = podCount * cpuPerPod;
  const totalMem = podCount * memoryPerPod;

  const nodesByCPU = totalCPU / instance.cpu;
  const nodesByMem = totalMem / instance.memory;
  const nodesNeeded = Math.ceil(Math.max(nodesByCPU, nodesByMem));

  const hourlyCost = nodesNeeded * instance.hourly;
  const dailyCost = hourlyCost * 24;
  const monthlyCost = dailyCost * 30;

  updateResults({
    instanceType: instance.type,
    totalPods: podCount,
    podCpu: cpuPerPod.toFixed(2),
    podMem: memoryPerPod.toFixed(2),
    totalCpu: totalCPU.toFixed(2),
    totalMem: totalMem.toFixed(2),
    nodesNeeded,
    hourlyRate: instance.hourly.toFixed(4),
    dailyCost: dailyCost.toFixed(2),
    monthlyCost: monthlyCost.toFixed(2)
  });
});

function updateResults(data) {
  document.getElementById("instanceType").textContent = data.instanceType;
  document.getElementById("totalPods").textContent = data.totalPods;
  document.getElementById("podCpu").textContent = data.podCpu;
  document.getElementById("podMem").textContent = data.podMem;
  document.getElementById("totalCpu").textContent = data.totalCpu;
  document.getElementById("totalMem").textContent = data.totalMem;
  document.getElementById("nodesNeeded").textContent = data.nodesNeeded;
  document.getElementById("hourlyRate").textContent = data.hourlyRate;
  document.getElementById("dailyCost").textContent = data.dailyCost;
  document.getElementById("monthlyCost").textContent = data.monthlyCost;

  document.getElementById("resultSection").classList.remove("hidden");
}