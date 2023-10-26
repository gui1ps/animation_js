const ponto=document.getElementById("bolinha");
ponto.width=window.innerWidth;//Definição dos limites do canvas
ponto.height=window.innerHeight;
let lista=[];//Lista que vai receber vários pontos


class Dot {
    constructor(canvas){
        this.axle=Math.floor(Math.random()*3)//Escolhe de forma aleatória se o ponto irá se movimentar em x, y ou diagonal
        this.vel=Math.floor(Math.random()*0.5+1);//Esolhe de forma aleatória a velocidade do ponto (a mínima é 1 e a máxima é 6 pixels por loop)
        this.direct=Math.random()>0.5?1:-1;//Esse atributo define qual vai ser o sentido inicial dos pontos que se movimentam em x ou em y (para direita, esquerda,cima ou baixo)
        this.canvas=canvas;//Esse atributo se refere ao canvas em que os pontos serão desenhados
        this.x=Math.floor(Math.random() * (this.canvas.width ) + 1);//Define um ponto x aleatório no espaço do canvas para spawnar o ponto
        this.y=Math.floor(Math.random() * (this.canvas.height) + 1);//Define um ponto y aleatório no espaço do canvas para spawnar o ponto
        this.ctx=this.canvas.getContext("2d");//Contexto do canvas
        this.w=this.canvas.width / 2;//Largura do ponto
        this.h=this.canvas.height /2;//Altura do ponto
        this.row=1;
        this.directz=this.escolherz();
        this.convexoes=[];
    }
    spaw(){//Método para dar spaw em um ponto
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y,  this.row, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
    delete(){//Função que apaga o ponto (útil para dar a impressão de movimento)
       this.ctx.clearRect(this.x - this.row, this.y - this.row, this.row * 2, this.row * 2);
    }
    escolherz(){//Função que define um tipo de movimento diagonal inicial (crescente/decrescente para esquerda ou direita) dos pontos que forem desse tipo (a definição do tipo de ponto é totalmente aleatoria)
        if(this.axle==2){
            this.direct=NaN;
            return Math.floor(Math.random()*4);
        }
    }
    mudarrota(){//Função que define a mudança de movimento para cada tipo de direção (x,y ou diagonal) ao encostarem nos limites do canvas (que são os limites da tela)
        if(this.axle==0){
            if(this.x>=this.canvas.width){
                this.direct=1;
            }
            else if(this.x<=0){
                this.direct=0;
            }
        }
        else if(this.axle==1){
            if(this.y>=this.canvas.height){
                this.direct=1;
            }
            else if(this.y<=0){
                this.direct=0;
            }
        }
        else{
            if(this.y==0){
                if(this.directz==0){this.directz=3}else{if(this.directz==1){this.directz=2}};
            }
            else if(this.y==this.canvas.height){
                if(this.directz==2){this.directz=1}else{if(this.directz==3){this.directz=0}};
            }
            else if(this.x==0){
                if(this.directz==0){this.directz=1}else{if(this.directz==3){this.directz=2}};
            }
            else if(this.x==this.canvas.width){
                if(this.directz==1){this.directz=0}else{if(this.directz==2){this.directz=3}};
            }
        }
    }
    move(){//Função que define como que o ponto vai se comportar baseado em seu tipo de movimento
        if(this.axle==0){//Padrões de movimento em X
            if(this.direct<=0){
                this.mudarrota();
                this.delete();
                this.x+=this.vel;
                this.spaw();
            }else{
                this.mudarrota();
                this.delete();
                this.x-=this.vel;
                this.spaw();
            }
        }
        else if(this.axle==1){//Padrões de movimento em Y
            if(this.direct<=0){
                this.mudarrota();
                this.delete();
                this.y+=this.vel;
                this.spaw();
            }else{
                this.mudarrota();
                this.delete();
                this.y-=this.vel;
                this.spaw();
            }
        }
        else{//Padrões de movimento em diagonal
            if(this.directz==0){
                this.mudarrota();
                this.delete();
                this.y-=this.vel;
                this.x-=this.vel;
                this.spaw();
            }
            else if(this.directz==1){
                this.mudarrota();
                this.delete();
                this.y-=this.vel;
                this.x+=this.vel;
                this.spaw();
            }
            else if(this.directz==2){
                this.mudarrota();
                this.delete();
                this.y+=this.vel;
                this.x+=this.vel;
                this.spaw();
            }
            else{
                this.mudarrota();
                this.delete();
                this.y+=this.vel;
                this.x-=this.vel;
                this.spaw();}
        }
        for(let i of this.convexoes){
            this.ligar(i);
        }
    }
    ligar(outroponto){
        this.ctx.strokeStyle="White";
        this.ctx.lineWidth =0.1;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(outroponto.x, outroponto.y);
        this.ctx.stroke();
    }
    apagarlinha(outroponto) {
        let deltpointstarty;
        let deltpointstartx;
        let deltpointendx;
        let deltpointendy;

        if(outroponto.y<this.y && outroponto.x<this.x){
            deltpointstarty=outroponto.y-this.row;
            deltpointstartx=outroponto.x-this.row;
            deltpointendx=this.x+this.row;
            deltpointendy=this.y+this.row;
        }
        else if(outroponto.y<this.y && outroponto.x>this.x){
            deltpointstarty=outroponto.y-this.row;
            deltpointstartx=outroponto.x+this.row;
            deltpointendx=this.x-this.row;
            deltpointendy=this.y+this.row;
            }
        else if(outroponto.y>this.y && outroponto.x>this.x){
            deltpointstarty=outroponto.y+this.row;
            deltpointstartx=outroponto.x+this.row;
            deltpointendx=this.x-this.row;
            deltpointendy=this.y-this.row;
            }
        else{
            deltpointstarty=outroponto.y+this.row;
            deltpointstartx=outroponto.x-this.row;
            deltpointendx=this.x+this.row;
            deltpointendy=this.y-this.row;
            }
        this.ctx.clearRect(deltpointstartx,deltpointstarty,(deltpointendx-deltpointstartx),(deltpointendy-deltpointstarty));
    }
    adicionaconvexao(outroponto){
        this.convexoes.push(outroponto);
    }
}

class Pointer{
    constructor(){
        this.x;
        this.t;
        this.row=260;
        this.objctsinRaow=[];
    }
    atualizarXy(x,y){
        this.x=x;
        this.y=y;
    }
    getXy(){
        console.log(`X: ${this.x} | Y: ${this.y}`);
    }

}

const pointer=new Pointer();

document.addEventListener("mousemove",function(event){
    pointer.atualizarXy(event.clientX,event.clientY);
    pointer.getXy();
});

function encher(qntd){//Função que spawna vários pontos e os adiciona na lista
    for(let i=0;i<qntd;i++){
        let p=new Dot(ponto);
        p.spaw();
        lista.push(p);
    }    
}

function animar() {//Função que pega ponto por ponto na lista de pontos e os anima
    for (let i = 0; i < lista.length; i++) {
        lista[i].move();
    }
    requestAnimationFrame(animar);
}

encher(120);
requestAnimationFrame(animar);