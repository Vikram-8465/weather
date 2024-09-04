import { LightningElement, track} from 'lwc';
import images from "@salesforce/resourceUrl/Weather_App_images";

export default class Weather extends LightningElement {
    images = {
        clear :`${images}/clear.png`,
        clouds :`${images}/cloud.png`,
        mist : `${images}/mist.png`,
        none : `${images}/404.png`,
        rain : `${images}/rain.png`,
        snow : `${images}/snow.png`,
        wind : `${images}/wind-speed.png`,
        haze : `${images}/haze.png`,
        noImage : `${images}/no-image.png`,
    }
    @track weather = {};
    input = '';
    isLocationAvailable = false;
    isLocationNotAvailable = false;

    handleChange(event){
        this.input = event.target.value;
    }

    async handleClick(){
        if(!this.input) return;

         const apikey = `89f63a49c963ae6f5fac50d7ecfb3f9c`;
         const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.input}&appid=${apikey}`)
         const result = await data.json();

         if(result?.cod === 200){

            this.isLocationAvailable = true;
            this.isLocationNotAvailable = false;

            const { temp , humidity } = result.main;
            const { description, main:condition } = result.weather[0];
            const wind = Math.round(result.wind.speed * 3.6) || 0;
            console.log(condition);
            console.log(condition.toLowerCase());
            this.weather = {
                image : this.images[condition.toLowerCase()] || this.images.noImage,
                temp : Math.round(temp - 273.15) || 0,
                humidity,
                description,
                condition,
                wind,
            }
        
         }
         else{
             this.isLocationAvailable = false;
             this.isLocationNotAvailable = true;
             this.weather = {};
         }

        
    }
}