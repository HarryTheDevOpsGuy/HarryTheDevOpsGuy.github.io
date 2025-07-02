---
layout: docs
title: AWS Pricing AP-South-1
module: AWS
order: 1
---




<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Instance Family</th>
      <th>vCPUs</th>
      <th>Memory</th>
      <th>On Demand Cost</th>
      <th>Spot Average Cost</th>
    </tr>
  </thead>
  <tbody>
    {% for row in site.data.tools.instance %}
      <tr>
        <td>{{ row.Name }}</td>
        <td>{{ row["Instance Family"] }}</td>
        <td>{{ row["vCPUs"] }}</td>
        <td>{{ row["Instance Memory"] }}</td>
        <td>{{ row["On Demand"] }}</td>
        <td>{{ row["Linux Spot Average cost"] }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>
