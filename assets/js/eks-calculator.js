document.getElementById('eksCostForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const workerNodeSelect = document.getElementById('workerNode');
  const selectedOption = workerNodeSelect.options[workerNodeSelect.selectedIndex];
  const nodeCPU = parseFloat(selectedOption.dataset.cpu);
  const nodeMemory = parseFloat(selectedOption.dataset.memory);
  const hourlyRate = parseFloat(selectedOption.dataset.hourly);

  // Get pod inputs
  const podCount = parseFloat(document.getElementById('podCount').value);
  const cpuPerPod = parseFloat(document.getElementById('cpuPerPod').value);
  const memPerPod = parseFloat(document.getElementById('memoryPerPod').value);
  const UsagePerDay = parseFloat(document.getElementById('perDayUsage').value);

  // Unit cost calculation
  const cpuCostPerUnit = (hourlyRate / nodeCPU) / 2;
  const memCostPerUnit = (hourlyRate / nodeMemory) / 2;

  // Total resources needed
  const totalCpu = podCount * cpuPerPod;
  const totalMem = podCount * memPerPod;

  // Total cost based on pod resource usage
  const hourlyPodCost = (totalCpu * cpuCostPerUnit) + (totalMem * memCostPerUnit);
  const dailyPodCost = hourlyPodCost * UsagePerDay;
  const monthlyPodCost = dailyPodCost * 30.44;
  const perPodMonthlyCost = monthlyPodCost / podCount;

  // Pods per instance
  const podsPerNode = Math.min(
    Math.floor(nodeCPU / cpuPerPod),
    Math.floor(nodeMemory / memPerPod)
  );
  const totalInstances = Math.ceil(podCount / podsPerNode);
  const monthlyInstanceCost = totalInstances * hourlyRate * UsagePerDay * 30.44;

  // Update DOM
  // document.getElementById('instanceType').textContent = selectedOption.value;
  // document.getElementById('totalPods').textContent = podCount;
  // document.getElementById('totalPodsTable').textContent = podCount;
  // document.getElementById('podCpu').textContent = cpuPerPod;
  // document.getElementById('podMem').textContent = memPerPod;
  // document.getElementById('totalCpu').textContent = totalCpu.toFixed(2);
  // document.getElementById('totalMem').textContent = totalMem.toFixed(2);
  // document.getElementById('hourlyRate').textContent = hourlyPodCost.toFixed(4);
  // document.getElementById('dailyCost').textContent = dailyPodCost.toFixed(2);
  // document.getElementById('monthlyCost').textContent = monthlyPodCost.toFixed(2);
  // document.getElementById('perPodCost').textContent = perPodMonthlyCost.toFixed(2);
  document.getElementById('podsPerNode').textContent = podsPerNode || 0;
  // document.getElementById('nodesNeeded').textContent = totalInstances;
  document.getElementById('monthlyInstanceCost').textContent = monthlyInstanceCost.toFixed(2);

  // Populate card details
  document.getElementById('instanceTypeDetail').textContent = `${selectedOption.value} (${nodeCPU} vCPU + ${nodeMemory} GB)`;
  document.getElementById('perInstanceMonthlyCost').textContent = (hourlyRate * UsagePerDay * 30.44).toFixed(2);
  document.getElementById('monthlyInstanceCost').textContent = monthlyInstanceCost.toFixed(2);
  document.getElementById('nodesNeededDetail').textContent = totalInstances;
  document.getElementById('cpuPerPodDetail').textContent = cpuPerPod.toFixed(2);
  document.getElementById('memPerPodDetail').textContent = memPerPod.toFixed(2);
  document.getElementById('totalPodsDetail').textContent = podCount;
  document.getElementById('perPodMonthlyCostDetail').textContent = perPodMonthlyCost.toFixed(2);
  document.getElementById('monthlyPodCostDetail').textContent = monthlyPodCost.toFixed(2);

  // Show results
  document.getElementById('resultSection').classList.remove('hidden');
});