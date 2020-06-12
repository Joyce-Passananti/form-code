  var timer = 0;
  var speed = 10;
  var incr = -0.01;
  var wind = 0;

  var rain = {
    xs: [], 
    ys: [],
    dys: [],
    dxs: [],
    depth: []
  };
  var ripples = {
    xs: [],
    ys: [],
    ds: [],
    ogds: [],
    dds: [],
    r: [],
    g: [],
    b: []
  };


function setup() {
  createCanvas(innerWidth, innerHeight);
  background(0, 0, 20); 
}
  
function draw () {
  background(0, 0, 30, 15);   
  
  // for some ~dynamic movement~
  timer ++;
  speed += incr;
  if(speed > 5 || speed < -5) 
    incr = -incr;
  //change wind randomly
  if (timer%40 === 0)
    wind += random(-0.75,0.75);
  if(timer%(Math.floor(speed)) === 0) {
  //rain drops 
    //add
    rain.xs.push(random(0 - Math.abs(wind)*innerHeight, innerWidth + Math.abs(wind)*innerHeight));
    rain.ys.push(0);
    rain.dxs.push(wind);
    rain.dys.push(random(25,30));
    rain.depth.push(random(innerHeight*(3/4), innerHeight*(9.7/10)));
  }
    //move
    for(var j = 0; j < rain.xs.length; j++) {
      stroke(255);
      strokeWeight((rain.depth[j]- innerHeight*(1/2))/200);
      //draw
      line(rain.xs[j], rain.ys[j], rain.xs[j] + rain.dxs[j], rain.ys[j] + rain.dys[j]);
      //move
      rain.xs[j] += rain.dxs[j];
      rain.ys[j] += rain.dys[j];
      //splash
      if(rain.ys[j] > rain.depth[j]) {
        //add ripple
        ripples.xs.push(rain.xs[j]);
        ripples.ys.push(rain.ys[j]);
        ripples.ds.push((rain.depth[j] - innerHeight*(3/4)));
        ripples.ogds.push((rain.depth[j] - innerHeight*(3/4)));
        ripples.dds.push(random(3,5));
        ripples.r.push(random(65, 125));
        ripples.g.push(random(75, 155));
        ripples.b.push(random(150, 250));

        //remove drop
        rain.xs.splice(j,1);
        rain.ys.splice(j,1);
        rain.dxs.splice(j,1);
        rain.dys.splice(j,1);
        rain.depth.splice(j,1);
      }
      //draw splash
      for(var i = 0; i < ripples.xs.length; i++) {

          noStroke();
          fill(ripples.r[i], ripples.g[i], ripples.b[i], (6)*ripples.ds[i]);
          ellipse(ripples.xs[i], ripples.ys[i], ripples.ds[i], ripples.ogds[i]*(0.15));

          //~ripple~
          if(timer%10 === 0)
            ripples.ds[i] += ripples.dds[i];

          if(ripples.ds[i] > ripples.ogds[i]*1.5) {
            //remove drop
            ripples.xs.splice(i,1);
            ripples.ys.splice(i,1);            
            ripples.ds.splice(i,1);
            ripples.ogds.splice(i,1);
            ripples.dds.splice(i,1);
            ripples.r.splice(i,1);
            ripples.g.splice(i,1);
            ripples.b.splice(i,1);
          }
      }
      
    }
    
  
}
