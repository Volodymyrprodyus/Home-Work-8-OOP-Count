const container = document.querySelector('.container');

class Count {
    constructor(startMinutes, startSeconds, delay, autolaunch){
        this.startMinutes = startMinutes;
        this.startSeconds = startSeconds;
        this.delay = delay;
        this.autolaunch = autolaunch;
        this.render();
    }

    createCounter(){
        this.counter = document.createElement('div');
        this.counter.textContent = `${this.startMinutes}:${this.startSeconds}`;
        this.counter.classList.add('count');
        return this.counter;
    }


    createButtonstart(){
        this.buttonstart = document.createElement('button');
        this.buttonstart.innerHTML = ('Start');
        this.buttonstart.classList.add('button');
        this.buttonstart.style.display = 'block';
        return this.buttonstart;
    }

    createButtonstop(){
        this.buttonstop = document.createElement('button');
        this.buttonstop.textContent = 'Stop';
        this.buttonstop.classList.add('button_stop');
        this.buttonstop.style.display = 'none';
        return this.buttonstop;
    }

    reverseButton(){
        this.buttonstart.addEventListener(`click`, () => {
            this.buttonstart.style.display = 'none';
            this.buttonstop.style.display = 'block';
        });   

        this.buttonstop.addEventListener(`click`, () => {
            this.buttonstop.style.display = 'none';
            this.buttonstart.style.display = 'block';
        }); 
    }


    createElements(){
        container.append(this.createCounter());
        container.append(this.createButtonstart()); 
        container.append(this.createButtonstop()); 
    }

      
    stopTimer(){
        clearInterval(this.timerInterval);    
    }

    countTimer(){
        this.interval = 1;
        this.timerInterval = setInterval(() =>  {
            if (this.startMinutes === 0 && this.seconds === 0) {
                this.stopTimer();
                this.buttonstart.addEventListener('click', this.resetTimer())
            } 
            else {
                if (this.seconds <= 0) 
                 {
                    this.seconds = 60;
                    this.startMinutes--;
                 } else 
                  {
                    this.seconds = this.seconds - this.interval ;
                  }
                    this.counter.innerHTML = `${this.startMinutes}:` + (this.seconds < 10 ? "0" : "") + String(this.seconds);
                }
        }, this.delay); 
    }

    resetTimer() {
        this.seconds = this.startSeconds;
    }



    render(){
        this.createElements();
        this.reverseButton();
        this.seconds = this.startSeconds;
        this.buttonstop.addEventListener('click', this.stopTimer.bind(this));
        this.buttonstart.addEventListener('click', this.countTimer.bind(this));
        this.buttonstop.addEventListener('click', this.stopTimer.bind(this));
    }
}


// Створюємо екземпляр класу

class NextCount extends Count{
    constructor(startMinutes, startSeconds, autolaunch){
        super(startMinutes,startSeconds, autolaunch); 
    }

    render(){
         super.render();
            if (this.autolaunch === true) {
                this.buttonstart.style.display = 'none';
                this.buttonstop.style.display = 'block';
                window.addEventListener('load', this.countTimer());
            }
    }


    countTimer(){
        super.countTimer();
        this.interval = 2;
    }
}

class NormalCount extends Count{
    constructor(startMinutes, startSeconds, delay){
        super(startMinutes,startSeconds, delay); 
    }

        render(){
            super.render();
            window.addEventListener('load', this.countTimer());
        }

        createButtonstart(){
            super.createButtonstart();
            this.buttonstart.style.display = 'none';
            return this.buttonstart;
        }

    


        countTimer(){
            super.countTimer();
            this.duration = 0;
            this.timer = this.duration, this.startMinutes, this.startSeconds;
                this.timeInterval = setInterval (() => {
                    this.startMinutes = parseInt(this.timer / 60, 10);
                    this.startSeconds = parseInt(this.timer % 60, 10);
            
                    this.startMinutes = this.startMinutes < 10 ? "0" + this.startMinutes : this.startMinutes;
                    this.startSeconds = this.startSeconds < 10 ? "0" + this.startSeconds : this.startSeconds;
            
                    this.counter.innerHTML = `${this.startMinutes}` + ":" + `${this.startSeconds}`;
                    if (++this.timer <= 0) {
                        this.timer = this.duration;
                    }
                }, this.delay);
        }
    }




const count = new Count(00, 60, 1000, false);
const nextCount = new NextCount(90, 60, 2000, true);
const normalCount = new NormalCount(00, 00, 1000);

