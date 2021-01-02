
//calling bullet and player elements 

let bullet = document.querySelector('.bullet')
let player = document.querySelector('.player')

//creating function that will move our player 
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

//    creating bullet    // 
function createBullet(){
	let bullet = document.createElement("div");
	bullet.className = "bullet";
	bullet.style.top = player.offsetTop + 135 +"px";
    document.body.appendChild(bullet);
    bulletMove(bullet)
    
}

//     bullet  settings (shooting process)  //
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
// creating isReadyMegabullet function , that will help you after 2 kills  //
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

// continue isReadyMegabullet function (creating) //
    document.addEventListener('keydown',function (event){

        switch(event.keyCode){
        case 87:
            player.style.top = player.offsetTop - 200 + "px";
            player.style.transition = "1s"
            if(player.offsetTop < document.body.offsetTop){
                player.style.top = 100 + "px"
             }
         break;
// the time when I added isReadyMegabullet function , I need to move this bag too  //
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
// this function intervalTimeForFasrMove will help you to jump up //
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
// creating enemy //
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


// from random positions will come enemy , {using Math.random} //
function random(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

// calling this function (createEnemy)
createEnemey()

// this x variable inner isShot function 
let x = 0
//this function will check if bullet touching to enemy , enemy will be dead (removed)
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
            let p = document.querySelector('p')
         for(let y = 1; y < 2; y++){
             x = x + y 
             p.innerText = x
             let t = x
             getRecordValue(t)
        }
     }
// piece of code about (isReadyMegabullet function) , it's same with isShot function , you can see after 2 kills 
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


// in this function (getRecordValue) 4 important condition about enemy and (isReadyMegabullet) function
let helper =  document.querySelector('.helper')
let valueofRecord = document.querySelector('.record p')
function getRecordValue(u){
    valueofRecord.innerHTML = u 
    // enemy will be faster if inner valueofRecord will be 3
    if(valueofRecord.innerText > 3){
      document.querySelector('.enemy').classList.toggle('active');
    }
        // enemy will be faster if inner valueofRecord will be 5
    if(valueofRecord.innerText > 5){
        document.querySelector('.enemy').classList.toggle('adde');
    }
    // after 2 kills will be added 'helpTime classList' , and with this will be called (isReadyMegabullet) function
    if(valueofRecord.innerText >= 2){
        if(helper != null){
        helper.classList.add('helpTime')
        
      }
    }
}

// this y variable inner ( die ) function
let y = 0
// this function about lives , when enemy will pass to left , one of this life will be removed  
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
// continue about lives function creating process 
function newValue(){
        for(let y = 0; y<3; y++){
            let lives = document.querySelector('#lifes')
            let span = document.createElement('span')
            lives.appendChild(span)
    }
}
// after 3 lives our game will be reloaded
function endGame() {
    location.reload();
    if(location.reload){
        let r = document.querySelector('.record p')
        alert("Your Record!!!" + "    " + r.innerHTML)
    }
}

// this i variable inner timeForCity function , this is simple function that using with css background changing
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

////////////// thx for watching my code :D ///////////////

