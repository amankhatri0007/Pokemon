import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../service/network.service';
import { concatMap, map, pluck, toArray } from 'rxjs/operators';
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Util } from '../../service/util.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  pokemons: Array<any> = [];
  offset:number = 0;
  error:boolean = false;
  isDataAvaible:boolean = false;

  constructor(
    private network: NetworkService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private util:Util,
    private logger:NGXLogger
    ) { }

  ngOnInit(): void {
    //set event as null in first parameter of function.
    this.loadPokemons(null,0);
  }
  
  //Refresh functionality
  doRefresh(){
    this.error = false;
    this.pokemons = [];
    this.loadPokemons(null,0);
  }

  loadPokemons(event?:InfiniteScrollCustomEvent,offset?:number,isLoad?:boolean) {
    this.network.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .pipe(
        pluck('results'),
        concatMap(results=>from(results)),
        concatMap(result=>this.getPokemonImage(result["url"])),
        map(result=>{
          return {
            name:result.name,
            imageUrl:result["sprites"]["other"]["official-artwork"]["front_default"],
            baseExperience: result["base_experience"],
            height:result["height"],
            weight:result["weight"]
          }
        }),
        toArray()
      )
      .subscribe(resp => {
        this.pokemons.push(...resp);
        if(!isLoad){
          this.error = false;
        }
        this.logger.info(this.pokemons);
      }, error => {
        if(!isLoad){
          this.error = true;
        }
        this.logger.error(error.message);
      })
      //complete infinite scroll
      event?.target.complete();
  }

  //Get specific pokemon details from API
  getPokemonImage(url: string) {
    return this.network.get(url);
  }
  
  //Load More pokemon data
  loadMoreData(event){
    if(event){
      this.offset++;
      this.loadPokemons(event,this.offset,true);
    }
  }

  //Provide navigation to detail page.
  navigateHandler(item){
    this.util.set(item);
    this.router.navigate(['detail'],{relativeTo: this.activatedRoute});
  }
}
