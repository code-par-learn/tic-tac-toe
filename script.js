let gameboard=(function(){
    let board=['','','','','','','','',''];
   
    let render=()=>{
        document.getElementById('board').style.display="grid"
        let boardHtml="";
        board.forEach((ele,idx)=>{
            boardHtml+=`<div id="${idx}" class="box">${ele}</div>`
        })
        document.querySelector("#board").innerHTML=boardHtml;
        let boxes= document.querySelectorAll(".box");
        boxes.forEach((box)=>{
            box.addEventListener('click',game.markbox)
        })
    }
    let updatemark=(idx,marker)=>{
        board[idx]=marker;
        document.getElementById(`${idx}`).innerHTML+=marker;
        document.getElementById(`${idx}`).removeEventListener('click',game.markbox);
        
    }
    let restart=()=>{
        board=['','','','','','','','',''];
        gameboard.render();

    }
    let checkforwin=()=>{
        let winning_combo=[
            [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
        ];
        for(let i=0;i<winning_combo.length;i++){
            let [a,b,c]=winning_combo[i];
            if(board[a]&&board[a]==board[b]&&board[a]==board[c]){
                return true;
            }
        }
        return false;

    }
    

    return{render,updatemark,restart,checkforwin};
})();


let createPlayer=function(name,mark){
    
    return{name,mark};
}


let game =(()=>{
    let players;
    let current_player;
    let gameover;
    let start=function(){
        players=[
            createPlayer(document.querySelector("#player1").value?document.querySelector("#player1").value:"player1",'x'),
            createPlayer(document.querySelector("#player2").value?document.querySelector("#player2").value:"player2",'o')
        ]
        current_player=0;
        gameover=false;
        
gameboard.render();
    }
    let markbox=function(event){
        let idx=parseInt(event.target.id);
        gameboard.updatemark(idx,players[current_player].mark);
        if(gameboard.checkforwin()&& !gameover){
            gameover=true;
            document.querySelector("#winner").innerHTML=`<p>the ${players[current_player].name} Won the game</p>`;
        }
        player_turn();
    }
    let player_turn=()=>{
        if(current_player==0){
            current_player=1;
        }else{
            current_player=0;
        }
    }
    let restart=()=>{
        document.querySelector('#winner').innerHTML='';
        gameover=false;
        current_player=0;
        gameboard.restart();
    }
    
return{start,markbox,restart};
})();


document.querySelector("#start").addEventListener('click',()=>{
    game.start();
})
document.querySelector('#reset').addEventListener('click',()=>{
    game.restart();
})