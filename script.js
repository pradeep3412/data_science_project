const data = [
    { category: 'A', value: 20 },
    { category: 'B', value: 35 },
    { category: 'C', value: 15 },
    { category: 'D', value: 45 },
    { category: 'E', value: 30 },
];


const width = 500;
const height = 300;
const margin = { top: 20, right: 30, bottom: 40, left: 40 };

const svg = d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);


const xScale = d3.scaleBand()
    .domain(data.map(d => d.category))
    .range([margin.left, width - margin.right])
    .padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);


svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.category))
    .attr('y', d => yScale(d.value))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - margin.bottom - yScale(d.value))
    .attr('fill', 'steelblue');


svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));

svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale));

