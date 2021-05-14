import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()

export class RecipeService {
    recipeSelected = new Subject<Recipe>();
    recipeChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Liangpi', 
        'Shangxi Cold Noodles', 
        'https://www.chinasichuanfood.com/wp-content/uploads/2015/09/Liangpi-Shangxi-Cold-Noodles-11-copy.jpg', 
        [
            new Ingredient('Rice Noodle', 1),
            new Ingredient('Szechuan sauce', 1)
        ]),
        new Recipe('Beyond Burger', 
        'Plant-based burger using Beyond Burger', 
        'https://www.beyondmeat.com/wp-content/uploads/beyondburger-e1552079697496.jpg',
        [
            new Ingredient('Patty', 1),
            new Ingredient('Bun', 1),
            new Ingredient('Tomato', 1),
            new Ingredient('Lettuce', 1)
        ])
      ];
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

      addRecipe(recipe: Recipe){
          this.recipes.push(recipe);
          this.recipeChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
          this.recipes[index] = newRecipe;
          this.recipeChanged.next(this.recipes.slice());
      }
}