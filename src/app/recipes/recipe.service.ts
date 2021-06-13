import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()

export class RecipeService {
    recipeSelected = new Subject<Recipe>();
    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];
    
      constructor(private slService: ShoppingListService) {}
      getRecipes() {
          return this.recipes.slice();
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
      }

      addRecipe(recipe: Recipe){
          this.recipes.push(recipe);
          this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
          this.recipes[index] = newRecipe;
          this.recipeChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
          this.recipes.splice(index, 1);
          this.recipeChanged.next(this.recipes.slice());
      }
}