const world = Globe()
    (document.getElementById('globeViz'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    .pointOfView({ altitude: 2 });

let trafficData = [];
const socket = io('http://localhost:5000');

socket.on('new_traffic', function(data) {
    const newPoint = {
        lat: data.lat,
        lng: data.lon,
        size: data.suspicious === 1 ? 0.4 : 0.15,
        color: data.suspicious === 1 ? '#ff3333' : '#33ff33',
        timeAdded: Date.now()
    };
    
    trafficData.push(newPoint);
    
    const list = document.getElementById('traffic-list');
    const li = document.createElement('li');
    li.innerText = `IP: ${data.ip} | Suspicious: ${data.suspicious}`;
    li.style.color = newPoint.color;
    list.prepend(li);
    if(list.childNodes.length > 15) list.removeChild(list.lastChild); // keep last 15
});

setInterval(() => {
    const now = Date.now();
    
    trafficData.forEach(p => {
        const age = now - p.timeAdded;
        
        if (age > 10000) {
            p.color = 'rgb(255, 255, 255)';
            p.size = 0.05;
        }
    });

    if (trafficData.length > 5000) {
        trafficData = trafficData.slice(trafficData.length - 5000);
    }
    
    world.pointsData(trafficData)
        .pointAltitude('size')
        .pointColor('color');
        
}, 1000);