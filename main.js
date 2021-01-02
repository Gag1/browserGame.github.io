//get access to the player
//create function that will move our player 
//create bullet 

let bullet = document.querySelector('.bullet')
let player = document.querySelector('.player')

document.addEventListener('keydown',function (event){
    switch(event.keyCode){
    case 87:
        player.style.top = player.offsetTop - 100 + "px";
        player.style.transition = "1s"
        if(player.offsetTop < document.body.offsetTop){
           player.style.top = 100 + "px"
        }
     break;

     case 83:
        player.style.top = player.offsetTop + 100 + "px";
        player.style.transition = "1s"

        if(player.style.top > "550px" ){
            player.style.top = 40 + "px"
            var cityImg = document.querySelector('.city img')
            cityImg.style.height = '80px'
            let timeLeft = 3
            setInterval(function(){
               if(timeLeft<2){
                   cityImg.style.height = '150px'
               }
               timeLeft -= 1
            },1000)
        }

     break;
     case 32:
        createBullet()
     break;
}
})

function createBullet(){
	let bullet = document.createElement("div");
	bullet.className = "bullet";
	bullet.style.top = player.offsetTop + 135 +"px";
    document.body.appendChild(bullet);
    bulletMove(bullet)
    
}

function bulletMove(bullet){
     let timerId = setInterval(function() {
          bullet.style.left = bullet.offsetLeft + 20 + "px";

          isShot(bullet,timerId)
            if(bullet.offsetLeft > document.body.clientWidth){
                bullet.remove()
                clearInterval(timerId)
            }
   
   }, 20);

}

function isReadyMegabullet(){
    let titleForFast = document.querySelector('.title-for-fast-parent');
    let div = document.createElement('div');
    div.classList = 'title-for-fast'
    titleForFast.appendChild(div);
    let p = document.createElement('p')
    div.appendChild(p)
    p.innerText = 15
    let y = div
    intervalTimeForFastMove(y)

  
    document.addEventListener('keydown',function (event){

        switch(event.keyCode){
        case 87:
            player.style.top = player.offsetTop - 200 + "px";
            player.style.transition = "1s"
            if(player.offsetTop < document.body.offsetTop){
                player.style.top = 100 + "px"
             }
         break;
    
         case 83:
            player.style.top = player.offsetTop + 200 + "px";
            player.style.transition = "1s"
            if(player.style.top > "550px" ){
                player.style.top = 40 + "px"
                var cityImg = document.querySelector('.city img')
                cityImg.style.height = '80px'
                let timeLeft = 3
                setInterval(function(){
                   if(timeLeft<2){
                       cityImg.style.height = '150px'
                   }
                   timeLeft -= 1
                },1000)
            }

         break;
    }
    })

    titleForFast.appendChild(megaBullet);

}

function intervalTimeForFastMove(x){
       let timer = 15
       let titleForFastP = document.querySelector('.title-for-fast p')
       let timerId = setInterval(function(){
              if(timer <1){
                  clearInterval(timerId)
                  x.remove()
                  document.addEventListener('keydown',function (event){

                    switch(event.keyCode){
                    case 87:
                        player.style.top = player.offsetTop - 100 + "px";
                        player.style.transition = "1s"
                     break;
                
                     case 83:
                        player.style.top = player.offsetTop + 100 + "px";
                        player.style.transition = "1s"
            
                     break;
                }
                })
              }
              titleForFastP.innerHTML = timer
              timer -=1
            console.log(timer)
          },1000)
        
}

function createEnemey(){
    let enemy = document.createElement('div')    
    enemy.className = "enemy"
    document.body.appendChild(enemy)
    enemy.style.top = random(400, document.body.offsetHeight - 10) + "px";
    document.body.appendChild(enemy);
    let timerId = setInterval(function() {
		enemy.style.left = (enemy.offsetLeft - 2) + "px";
		if(enemy.offsetLeft + enemy.offsetWidth < 0) {
            clearInterval(timerId);
            die();
            enemy.remove()
            createEnemey()

        }
        let r = document.querySelector('.record p')
        if(r.innerHTML > 1){
            let timerId = setInterval(function() {
                enemy.style.left = (enemy.offsetLeft - 2) + "px";
                if(enemy.offsetLeft + enemy.offsetWidth < 0) {
                    clearInterval(timerId);
                    die();
                    enemy.remove()
                    createEnemey()
                }
            },1500)
        }
        
	}, 10);
    enemy.dataset.timer = timerId;
}



function random(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

createEnemey()

var x = 0
function isShot(bullet) {
    let topB = bullet.offsetTop
    let enemy = document.querySelector(".enemy");
    let helper = document.querySelector('.helpTime')
      if(enemy != null){
          let topE = enemy.offsetTop;
          let bottomE =  enemy.offsetTop + enemy.offsetHeight;

          let leftB = bullet.offsetLeft;
          let leftE = enemy.offsetLeft

          if(topB >= topE && topB <= bottomE && leftB >= leftE){
            enemy.remove()
            createEnemey()
            var p = document.querySelector('p')
         for(var y = 1; y < 2; y++){
             x = x + y 
             p.innerText = x
             var t = x
             getRecordValue(t)
        }
    
     }
       if(helper != null){
        let topH = helper.offsetTop;
        let bottomH = helper.offsetTop + helper.offsetHeight;
 
        let leftH = helper.offsetLeft;
         if(topB >= topH && topB <= bottomH && leftB >= leftH){
            helper.remove()
            isReadyMegabullet()
         }
       }
    }
}



let helper =  document.querySelector('.helper')
let valueofRecord = document.querySelector('.record p')
function getRecordValue(u){
    valueofRecord.innerHTML = u 
    if(valueofRecord.innerText > 3){
      document.querySelector('.enemy').classList.toggle('active');
    }
    if(valueofRecord.innerText > 5){
        document.querySelector('.enemy').classList.toggle('adde');
    }
    if(valueofRecord.innerText > 6){
        if(helper != null){
        helper.classList.add('helpTime')
        

      }
    }
}


var y = 0
function die() {
        let lifesBlock = document.querySelector('#lives');
		let lives = lifesBlock.querySelector("span");
        lives.remove();
        y=y+1
        lives--;
        if(y === 3 ){
            lifesBlock.remove();
            endGame()
            newValue()
    }
}
function newValue(){
        for(let y = 0; y<3; y++){
            let lives = document.querySelector('#lifes')
            let span = document.createElement('span')
            lives.appendChild(span)
    }
}

function endGame() {
    location.reload();
    if(location.reload){
        let r = document.querySelector('.record p')
        alert("Your Record!!!" + "    " + r.innerHTML)
    }
}

let i = 10
let timerForCity = setInterval(function(){
    if(i === 7){
        clearInterval(timerForCity)
        let city1 = document.querySelector('.city')
        let div = document.createElement('div')
        div.classList = 'city2'
        city1.appendChild(div)
}
    console.log(i)
    i -=1
},1000)

