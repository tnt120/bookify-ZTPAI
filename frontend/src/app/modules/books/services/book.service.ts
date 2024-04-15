import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  calculateRating(book: Book) {
    return parseFloat((book.ratings.length ? book.ratings.reduce((acc, item) => acc + item.value, 0) / book.ratings.length : 0).toFixed(1));
  }

  getBooks(): Observable<Book[]> {
    return of(this.mockedBooks);
  }

  mockedBooks: Book[] = [
    {
      id: 1,
      title: 'Fall of Ruin and Wrath',
      author: 'Jennifer L. Armentrout',
      imageUrl: 'fall-of-ruin.jpg',
      ratings: [{value: 10}, {value: 9}],
      genre: 'romanse',
      description: "SHE LIVES BY HER INTUITION. HE FEEDS ON HER PLEASURE.Long ago, the world was destroyed by gods. Only nine cities were spared. Separated by vast wilderness teeming with monsters and unimaginable dangers, each city is now ruled by a guardian―royalty who feed on mortal pleasure.Born with an intuition that never fails, Calista knows her talents are of great value to the power-hungry of the world, so she lives hidden as a courtesan of the Baron of Archwood. In exchange for his protection, she grants him information.When her intuition leads her to save a traveling prince in dire trouble, the voice inside her blazes with warning―and promise. Today he’ll bring her joy. One day he'll be her doom.When the Baron takes an interest in the traveling prince and the prince takes an interest in Calista, she becomes the prince’s temporary companion. But the city simmers with rebellion, and with knights and monsters at her city gates and a hungry prince in her bed, intuition may not be enough to keep her safe.Calista must follow her intuition to safety or follow her heart to her downfall.",
      pages: 332,
      releaseDate: '04.07.2023',
      comments: [
        {
          user: 'xyz',
          date: '16.03.2024',
          content: 'Super ksiąka!'
        }
      ],
    },
    {
      id: 2,
      title: 'Fall of Ruin and Wrath',
      author: 'Jennifer L. Armentrout',
      imageUrl: 'fall-of-ruin.jpg',
      ratings: [{value: 10}, {value: 9}, {value: 1}, {value: 1}],
      genre: 'romanse',
      description: "SHE LIVES BY HER INTUITION. HE FEEDS ON HER PLEASURE.Long ago, the world was destroyed by gods. Only nine cities were spared. Separated by vast wilderness teeming with monsters and unimaginable dangers, each city is now ruled by a guardian―royalty who feed on mortal pleasure.Born with an intuition that never fails, Calista knows her talents are of great value to the power-hungry of the world, so she lives hidden as a courtesan of the Baron of Archwood. In exchange for his protection, she grants him information.When her intuition leads her to save a traveling prince in dire trouble, the voice inside her blazes with warning―and promise. Today he’ll bring her joy. One day he'll be her doom.When the Baron takes an interest in the traveling prince and the prince takes an interest in Calista, she becomes the prince’s temporary companion. But the city simmers with rebellion, and with knights and monsters at her city gates and a hungry prince in her bed, intuition may not be enough to keep her safe.Calista must follow her intuition to safety or follow her heart to her downfall.",
      pages: 432,
      releaseDate: '04.07.2023',
      comments: [
        {
          user: 'xyz',
          date: '16.03.2024',
          content: 'Super ksiąka!'
        }
      ],
    },
    {
      id: 3,
      title: 'Fall of Ruin and Wrath',
      author: 'Jennifer L. Armentrout',
      imageUrl: 'fall-of-ruin.jpg',
      ratings: [{value: 10}, {value: 9}],
      genre: 'romanse',
      description: "SHE LIVES BY HER INTUITION. HE FEEDS ON HER PLEASURE.Long ago, the world was destroyed by gods. Only nine cities were spared. Separated by vast wilderness teeming with monsters and unimaginable dangers, each city is now ruled by a guardian―royalty who feed on mortal pleasure.Born with an intuition that never fails, Calista knows her talents are of great value to the power-hungry of the world, so she lives hidden as a courtesan of the Baron of Archwood. In exchange for his protection, she grants him information.When her intuition leads her to save a traveling prince in dire trouble, the voice inside her blazes with warning―and promise. Today he’ll bring her joy. One day he'll be her doom.When the Baron takes an interest in the traveling prince and the prince takes an interest in Calista, she becomes the prince’s temporary companion. But the city simmers with rebellion, and with knights and monsters at her city gates and a hungry prince in her bed, intuition may not be enough to keep her safe.Calista must follow her intuition to safety or follow her heart to her downfall.",
      pages: 432,
      releaseDate: '04.07.2023',
      comments: [
        {
          user: 'xyz',
          date: '16.03.2024',
          content: 'Super ksiąka!'
        }
      ],
    },
    {
      id: 4,
      title: 'Fall of Ruin and Wrath',
      author: 'Jennifer L. Armentrout',
      imageUrl: 'fall-of-ruin.jpg',
      ratings: [{value: 10}, {value: 9}],
      genre: 'romanse',
      description: "SHE LIVES BY HER INTUITION. HE FEEDS ON HER PLEASURE.Long ago, the world was destroyed by gods. Only nine cities were spared. Separated by vast wilderness teeming with monsters and unimaginable dangers, each city is now ruled by a guardian―royalty who feed on mortal pleasure.Born with an intuition that never fails, Calista knows her talents are of great value to the power-hungry of the world, so she lives hidden as a courtesan of the Baron of Archwood. In exchange for his protection, she grants him information.When her intuition leads her to save a traveling prince in dire trouble, the voice inside her blazes with warning―and promise. Today he’ll bring her joy. One day he'll be her doom.When the Baron takes an interest in the traveling prince and the prince takes an interest in Calista, she becomes the prince’s temporary companion. But the city simmers with rebellion, and with knights and monsters at her city gates and a hungry prince in her bed, intuition may not be enough to keep her safe.Calista must follow her intuition to safety or follow her heart to her downfall.",
      pages: 432,
      releaseDate: '04.07.2023',
      comments: [
        {
          user: 'xyz',
          date: '16.03.2024',
          content: 'Super ksiąka!'
        }
      ],
    },
    {
      id: 5,
      title: 'Fall of Ruin and Wrath',
      author: 'Jennifer L. Armentrout',
      imageUrl: 'fall-of-ruin.jpg',
      ratings: [{value: 10}, {value: 9}],
      genre: 'romanse',
      description: "SHE LIVES BY HER INTUITION. HE FEEDS ON HER PLEASURE.Long ago, the world was destroyed by gods. Only nine cities were spared. Separated by vast wilderness teeming with monsters and unimaginable dangers, each city is now ruled by a guardian―royalty who feed on mortal pleasure.Born with an intuition that never fails, Calista knows her talents are of great value to the power-hungry of the world, so she lives hidden as a courtesan of the Baron of Archwood. In exchange for his protection, she grants him information.When her intuition leads her to save a traveling prince in dire trouble, the voice inside her blazes with warning―and promise. Today he’ll bring her joy. One day he'll be her doom.When the Baron takes an interest in the traveling prince and the prince takes an interest in Calista, she becomes the prince’s temporary companion. But the city simmers with rebellion, and with knights and monsters at her city gates and a hungry prince in her bed, intuition may not be enough to keep her safe.Calista must follow her intuition to safety or follow her heart to her downfall.",
      pages: 432,
      releaseDate: '04.07.2023',
      comments: [
        {
          user: 'xyz',
          date: '16.03.2024',
          content: 'Super ksiąka!'
        }
      ],
    },
    {
      id: 6,
      title: 'Fall of Ruin and Wrath',
      author: 'Jennifer L. Armentrout',
      imageUrl: 'fall-of-ruin.jpg',
      ratings: [{value: 10}, {value: 9}],
      genre: 'romanse',
      description: "SHE LIVES BY HER INTUITION. HE FEEDS ON HER PLEASURE.Long ago, the world was destroyed by gods. Only nine cities were spared. Separated by vast wilderness teeming with monsters and unimaginable dangers, each city is now ruled by a guardian―royalty who feed on mortal pleasure.Born with an intuition that never fails, Calista knows her talents are of great value to the power-hungry of the world, so she lives hidden as a courtesan of the Baron of Archwood. In exchange for his protection, she grants him information.When her intuition leads her to save a traveling prince in dire trouble, the voice inside her blazes with warning―and promise. Today he’ll bring her joy. One day he'll be her doom.When the Baron takes an interest in the traveling prince and the prince takes an interest in Calista, she becomes the prince’s temporary companion. But the city simmers with rebellion, and with knights and monsters at her city gates and a hungry prince in her bed, intuition may not be enough to keep her safe.Calista must follow her intuition to safety or follow her heart to her downfall.",
      pages: 432,
      releaseDate: '04.07.2023',
      comments: [
        {
          user: 'xyz',
          date: '16.03.2024',
          content: 'Super ksiąka!'
        }
      ],
    }
  ]
}
