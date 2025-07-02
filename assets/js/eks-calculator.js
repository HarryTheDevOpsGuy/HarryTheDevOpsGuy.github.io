document.getElementById('eksCostForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const workerNodeSelect = document.getElementById('workerNode');
  const selectedOption = workerNodeSelect.options[workerNodeSelect.selectedIndex];
  const nodeCPU = parseFloat(selectedOption.dataset.cpu);
  const nodeMemory = parseFloat(selectedOption.dataset.memory);
  const hourlyRate = parseFloat(selectedOption.dataset.hourly);
  const spotHourlyRate = parseFloat(selectedOption.dataset.spothourly);

  const spotDiscount = (hourlyRate - spotHourlyRate) / hourlyRate * 100

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

  // Spot pod cost 
  const perPodmonthlySpotPodCost = perPodMonthlyCost * (1 - spotDiscount / 100)
  const monthlySpotPodCost = monthlyPodCost * (1 - spotDiscount / 100)
  const dailySpotPodCost = dailyPodCost * (1 - spotDiscount / 100)
  const hourlySpotPodCost = hourlyPodCost * (1 - spotDiscount / 100)


  // Pods per instance
  const podsPerNode = Math.min(
    Math.floor(nodeCPU / cpuPerPod),
    Math.floor(nodeMemory / memPerPod)
  );
  const totalInstances = Math.ceil(podCount / podsPerNode);
  const monthlyInstanceCost = totalInstances * hourlyRate * UsagePerDay * 30.44;
  const dailyInstanceCost = totalInstances * hourlyRate * UsagePerDay;
  const hourlyInstanceCost = totalInstances * hourlyRate;

  // SPOT Price
  const monthlySpotInstanceCost = monthlyInstanceCost * (1 - spotDiscount / 100)
  const dailySpotInstanceCost = dailyInstanceCost * (1 - spotDiscount / 100)
  const hourlySpotInstanceCost = hourlyInstanceCost * (1 - spotDiscount / 100)
  



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
  // document.getElementById('monthlyInstanceCost').textContent = monthlyInstanceCost.toFixed(2);

  // Populate card details
  document.getElementById('instanceTypeDetail').textContent = `${selectedOption.value} (${nodeCPU} vCPU + ${nodeMemory} GB)`;
  
  document.getElementById('monthlyInstanceCost').textContent = monthlyInstanceCost.toFixed(2);
  // Spot instance costs
  document.getElementById('perInstanceMonthlyCostSpot').textContent = (spotHourlyRate * UsagePerDay * 30.44).toFixed(2);
  document.getElementById('monthlySpotInstance').textContent = monthlySpotInstanceCost.toFixed(2);
  document.getElementById('dailySpotInstance').textContent = dailySpotInstanceCost.toFixed(2);
  document.getElementById('hourlySpotInstance').textContent = hourlySpotInstanceCost.toFixed(2);
  document.getElementById('spotDiscountPct').textContent = spotDiscount.toFixed();
  
  // On Demand instance costs
  document.getElementById('perInstanceMonthlyCost').textContent = (hourlyRate * UsagePerDay * 30.44).toFixed(2);
  document.getElementById('monthlyOnDemand').textContent = monthlyInstanceCost.toFixed(2);
  document.getElementById('dailyOnDemand').textContent = dailyInstanceCost.toFixed(2);
  document.getElementById('hourlyOnDemand').textContent = hourlyInstanceCost.toFixed(2);
  document.getElementById('nodesNeededDetail').textContent = totalInstances;

  // Pod cost
  // document.getElementById('cpuPerPodDetail').textContent = cpuPerPod.toFixed(2);
  // document.getElementById('memPerPodDetail').textContent = memPerPod.toFixed(2);
  document.getElementById('totalPodsDetail').textContent = podCount;
  document.getElementById('perPodMonthlyCostDetail').textContent = perPodMonthlyCost.toFixed(2);
  document.getElementById('monthlyPodCostDetail').textContent = monthlyPodCost.toFixed(2);
  document.getElementById('hourlyPodCost').textContent = hourlyPodCost.toFixed(2);
  document.getElementById('dailyPodCost').textContent = dailyPodCost.toFixed(2);
  document.getElementById('monthlyPodCost').textContent = monthlyPodCost.toFixed(2);

  document.getElementById('perPodMonthlyCostDetailSpot').textContent = perPodmonthlySpotPodCost.toFixed(2);
  document.getElementById('hourlyPodCostSpot').textContent = hourlySpotPodCost.toFixed(2);
  document.getElementById('dailyPodCostSpot').textContent = dailySpotPodCost.toFixed(2);
  document.getElementById('monthlyPodCostSpot').textContent = monthlySpotPodCost.toFixed(2);
  
  // SPOT POD COST
  
  document.getElementById('podResourceDetail').textContent = `${cpuPerPod.toFixed(2)} vCPU + ${memPerPod.toFixed(2)} GB`;

  // Show results
  document.getElementById('resultSection').classList.remove('hidden');
});