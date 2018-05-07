window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

function onKeyDown(e) {
    e.returnValue = false;
    if(myCharDie == false){
    switch (e.keyCode) {
        case 27:
            goLeft();
            break;
        case 37: // 왼쪽
            if (char[0].charging == false) {
                char[0].state = 5;
                char[0].mvFlag = true;
                char[0].state_temp = 1;
                char[0].mvLeft = true;
            if(char[0].mvFlag == false) char[0].beh = 0;
            }
            break;
        case 38: // 위
            if (char[0].charging == false) {
                char[0].state = 6;
                char[0].mvFlag = true;
                char[0].state_temp = 2;
                char[0].mvUp = true;

            if(char[0].mvFlag == false) char[0].beh = 0;
            }
            break;
        case 39: // 오른쪽
            if (char[0].charging == false) {
                char[0].state = 7;
                char[0].mvFlag = true;
                char[0].state_temp = 3;
                char[0].mvRight = true;
            if(char[0].mvFlag == false) char[0].beh = 0;
            }
            break;
        case 40: // 아래
            if (char[0].charging  == false) {
                char[0].state = 4;
                char[0].mvFlag = true;
                char[0].state_temp = 0;
                char[0].mvDown = true;
            if(char[0].mvFlag == false) char[0].beh = 0;
            }
            break;
        case 32: // space
            if (char[0].attackFlag) {
            switch (char[0].state) {
                case 1:
                case 5:
                    PBulletArr.push({
                        x: char[0].x + 10,
                        y: char[0].y + 55,
                      width: 16,
                      height: 17,
                        goX: -1,
                        goY: 0,
                        damage: 0,
                      name: null,
                      speed:10
                    });
                    break;
                case 0:
                case 4:
                    PBulletArr.push({
                        x: char[0].x + 48,
                        y: char[0].y + 120,
                      width: 16,
                      height: 17,
                        goX: 0,
                        goY: 1,
                        damage: 0,
                      name: null,
                      speed:10
                    });
                    break;
                case 3:
                case 7:
                    PBulletArr.push({
                        x: char[0].x + 90,
                        y: char[0].y + 55,
                      width: 16,
                      height: 17,
                        goX: 1,
                        goY: 0,
                        damage: 0,
                      name: null,
                      speed:10
                    });
                    break;
                case 2:
                case 6:
                    PBulletArr.push({
                        x: char[0].x + 48,
                        y: char[0].y + 20,
                      width: 16,
                      height: 17,
                        goX: 0,
                        goY: -1,
                        damage: 0,
                      name: null,
                      speed:10
                    });
                    break;
            }
              PBulletArr[PBulletArr.length-1].damage = attackDamage();
              char[0].attackFlag = false;
              setTimeout(function() {
                  char[0].attackFlag = true;
              }, 1000 / char[0].ASpeed);
            }
            break;
        case 65: // 'a' button
            if (!char[0].ACool && !char[0].silence) {
                char[0].beh = 0;
                switch (char[0].state) {
                    case 5:
                        char[0].state = 1;
                        break;
                    case 4:
                        char[0].state = 0;
                        break;
                    case 7:
                        char[0].state = 3;
                        break;
                    case 6:
                        char[0].state = 2;
                        break;
                    default:
                        char[0].state = char[0].state;
                        break;
                }
                char[0].charging = true;
                char[0].silence = true;
                char[0].mvUp = false;
                char[0].mvDown = false;
                char[0].mvLeft = false;
                char[0].mvRight = false;
                chargeArr.push(water);
                watercharge = setInterval(function() {
                    char[0].charge++;
                    if (char[0].charge == 100) {
                        clearInterval(watercharge);
                        char[0].charge = 0;
                        char[0].stack++;
                        char[0].charging = false;
                        char[0].silence = false;
                        if(char[0].stack == 7){
                          char[0].stack = 0;
                        } else{
                        char[0].ACool = 5000;
                        }
                        switch (char[0].state) {
                            case 1:
                            case 5:
                                PBulletArr.push({
                                    x: char[0].x - 10,
                                    y: char[0].y + 50,
                                    goX: -1,
                                    goY: 0,
                                    width: 61,
                                    height: 57,
                                    damage: 0,
                                    speed: 20,
                                    name: "water"
                                });
                                break;
                            case 0:
                            case 4:
                                PBulletArr.push({
                                    x: char[0].x + 20,
                                    y: char[0].y + 100,
                                    goX: 0,
                                    goY: 1,
                                    width: 61,
                                    height: 57,
                                    damage: 0,
                                    speed: 20,
                                    name: "water"
                                });
                                break;
                            case 3:
                            case 7:
                                PBulletArr.push({
                                    x: char[0].x + 40,
                                    y: char[0].y + 50,
                                    goX: 1,
                                    goY: 0,
                                    width: 61,
                                    height: 57,
                                    damage: 0,
                                    speed: 20,
                                    name: "water"
                                });
                                break;
                            case 2:
                            case 6:
                                PBulletArr.push({
                                    x: char[0].x + 20,
                                    y: char[0].y,
                                    goX: 0,
                                    goY: -1,
                                    width: 61,
                                    height: 57,
                                    damage: 0,
                                    speed: 20,
                                    name: "water"
                                });
                                break;
                        }
                        PBulletArr[PBulletArr.length - 1].damage =
                            water_damage() * attackDamage();
                        if (char[0].ALevel == 7) {
                            boss.waterStack += 3;
                        } else if (char[0].ALevel >= 3) {
                            boss.waterStack++;
                        }
                    }
                }, 10);
            }
            break;
        case 68: // 'd' button
            if (!char[0].DCool && !char[0].silence) {
                char[0].beh = 0;
                switch (char[0].state) {
                    case 5:
                        char[0].state = 1;
                        break;
                    case 4:
                        char[0].state = 0;
                        break;
                    case 7:
                        char[0].state = 3;
                        break;
                    case 6:
                        char[0].state = 2;
                        break;
                    default:
                        char[0].state = char[0].state;
                        break;
                }
                char[0].charging = true;
                char[0].silence = true;
                char[0].mvUp = false;
                char[0].mvDown = false;
                char[0].mvLeft = false;
                char[0].mvRight = false;
                chargeArr.push(tsunami);
                tsunamicharge = setInterval(function() {
                    char[0].charge++;
                    if (char[0].charge == 100) {
                        clearInterval(tsunamicharge);
                        char[0].charging = false;
                        char[0].silence = false;
                        char[0].charge = 0;
                        char[0].stack++;
                        if(char[0].stack == 7){
                          char[0].stack = 0;
                        } else{

                        char[0].DCool = 5000;
                        }
                        switch (char[0].state) {
                            case 1:
                            case 5:
                                PBulletArr.push({
                                    x: char[0].x - 30,
                                    y: char[0].y + 15,
                                    goX: -1,
                                    goY: 0,
                                    width: 115,
                                    height: 125,
                                    damage: 0,
                                    speed: 20,
                                    name: "tsunami"
                                });
                                break;
                            case 0:
                            case 4:
                                PBulletArr.push({
                                    x: char[0].x - 10,
                                    y: char[0].y + 50,
                                    goX: 0,
                                    goY: 1,
                                    width: 115,
                                    height: 125,
                                    damage: 0,
                                    speed: 20,
                                    name: "tsunami"
                                });
                                break;
                            case 3:
                            case 7:
                                PBulletArr.push({
                                    x: char[0].x + 70,
                                    y: char[0].y + 15,
                                    goX: 1,
                                    goY: 0,
                                    width: 115,
                                    height: 125,
                                    damage: 0,
                                    speed: 20,
                                    name: "tsunami"
                                });
                                break;
                            case 2:
                            case 6:
                                PBulletArr.push({
                                    x: char[0].x - 15,
                                    y: char[0].y - 30,
                                    goX: 0,
                                    goY: -1,
                                    width: 115,
                                    height: 125,
                                    damage: 0,
                                    speed: 20,
                                    name: "tsunami"
                                });
                                break;
                        }

                        if (boss.iceStack > 0 && boss.waterStack > 0) {
                            boss.iceStack--;
                            boss.waterStack--;
                            PBulletArr[PBulletArr.length - 1].damage = tsunami_stack_damage() *
                                attackDamage();
                        } else {
                            PBulletArr[PBulletArr.length - 1].damage = tsunami_damage() *
                                attackDamage();
                        }
                    }
                }, 15);
            }
            break;
        case 70: // 'f' button
            if (!char[0].FCool && !char[0].silence && (boss.iceStack > 0 || boss.waterStack > 0)) {
              char[0].stack++;
              if(char[0].stack == 7){
                char[0].stack = 0;
              } else {

              char[0].FCool = 5000;
              }
              boss.hp -= boss.iceStack * attackDamage() * magic_damage();
              boss.hp -= boss.waterStack * attackDamage() * magic_damage();
              boss.iceStack = 0;
              boss.waterStack = 0;
              effect.push(magic_hit);
            }
            break;
        case 83: // 's' button
            if (!char[0].SCool && !char[0].silence) {
                char[0].beh = 0;
                switch (char[0].state) {
                    case 5:
                        char[0].state = 1;
                        break;
                    case 4:
                        char[0].state = 0;
                        break;
                    case 7:
                        char[0].state = 3;
                        break;
                    case 6:
                        char[0].state = 2;
                        break;
                    default:
                        char[0].state = char[0].state;
                        break;
                }
                char[0].charging = true;
                char[0].silence = true;
                char[0].mvUp = false;
                char[0].mvDown = false;
                char[0].mvLeft = false;
                char[0].mvRight = false;
                chargeArr.push(blizard_charge);
                blizardcharge = setInterval(function() {
                    char[0].charge++;
                    if (char[0].charge == 100) {
                        clearInterval(blizardcharge);
                        char[0].charge = 0;
                      if(char[0].stack == 7){
                  char[0].stack = 0;
                } else {
                     char[0].SCool = 5000;
                }
                switch (char[0].state) {
                    case 1:
                    case 5:
                        blizard.oneX = -418;
                        blizard.oneY = -100;
                        effect.push(blizard);
                        break;
                    case 0:
                    case 4:
                        blizard.oneX = -75;
                        blizard.oneY = 250;
                        effect.push(blizard);
                        break;
                    case 3:
                    case 7:
                        blizard.oneX = 245;
                        blizard.oneY = -100;
                        effect.push(blizard);
                        break;
                    case 2:
                    case 6:
                        blizard.oneX = -75;
                        blizard.oneY = -410;
                        effect.push(blizard);
                        break;
                }
                if ((boss.x + 108 > char[0].x + blizard.oneX) && (boss.x + 20 < char[0].x + blizard.oneX + 218) &&
                    (boss.y + 20 < char[0].y + blizard.oneY + 210) && (boss.y + 108 > char[0].y + blizard.oneY)) {
                    boss.hp -= ice_damage() * attackDamage();
                    if (char[0].SLevel >= 3) {
                        boss.iceStack++;
                    }
                }
                for(var i=0;i<Monsters.length;i++){
                  if ((Monsters[i].x + 65 > char[0].x + blizard.oneX) && (Monsters[i].x < char[0].x + blizard.oneX + 218) &&
                    (Monsters[i].y < char[0].y + blizard.oneY + 210) && (Monsters[i].y + 59 > char[0].y + blizard.oneY)) {
                    Monsters[i].hp -= ice_damage() * attackDamage();
                  }
                }
                setTimeout(function() {
                    char[0].charging = false;
                    char[0].silence = false;
                }, 70 * 11);
              }
                }, 10);
    }
        break;
    }
    }
}

function onKeyUp(e) {
    if(myCharDie == false){
    switch (e.keyCode) {
        case 27:
            stop();
            break;
        case 37: // 왼쪽
            char[0].beh = 0;
            char[0].mvLeft = false;
            switch (mvCheck()) {
                case 'Up':
                    char[0].state = 6;
                    break;
                case 'Down':
                    char[0].state = 4;
                    break;
                case 'Left':
                    char[0].state = 5;
                    break;
                case 'Right':
                    char[0].state = 7;
                    break;
            }
            break;
        case 38: // 위
            char[0].beh = 0;
            char[0].mvUp = false;
            switch (mvCheck()) {
                case 'Up':
                    char[0].state = 6;
                    break;
                case 'Down':
                    char[0].state = 4;
                    break;
                case 'Left':
                    char[0].state = 5;
                    break;
                case 'Right':
                    char[0].state = 7;
                    break;
            }
            break;
        case 39: // 오른쪽
            char[0].beh = 0;
            char[0].mvRight = false;
            switch (mvCheck()) {
                case 'Up':
                    char[0].state = 6;
                    break;
                case 'Down':
                    char[0].state = 4;
                    break;
                case 'Left':
                    char[0].state = 5;
                    break;
                case 'Right':
                    char[0].state = 7;
                    break;
            }
            break;
        case 40: // 아래
            char[0].beh = 0;
            char[0].mvDown = false;
            switch (mvCheck()) {
                case 'Up':
                    char[0].state = 6;
                    break;
                case 'Down':
                    char[0].state = 4;
                    break;
                case 'Left':
                    char[0].state = 5;
                    break;
                case 'Right':
                    char[0].state = 7;
                    break;
            }
            break;
        case 65: // 'a' button
            if (char[0].charging == true) {
                remove_water();
            }
            break;
        case 68: // 'd' button
            if (char[0].charging == true) {
                remove_tsunami();
            }
            break;
      case 83: // 's' button
        if(char[0].charging == true){
            remove_blizard();
          }
    }
    if (!char[0].mvUp && !char[0].mvLeft &&
        !char[0].mvRight && !char[0].mvDown) char[0].state = char[0].state_temp;
    }
}
