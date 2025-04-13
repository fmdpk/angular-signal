import {
  Component,
  effect,
  Inject,
  inject,
  Injector,
  OnInit,
  PLATFORM_ID,
  runInInjectionContext,
  Signal,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignalService } from './services/signal.service';
import { isPlatformBrowser } from '@angular/common';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { TemplateDrivenFormComponent } from './components/template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { PersianHolidaysComponent } from './components/persian-holidays/persian-holidays.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ShoppingCartComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
    PersianHolidaysComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public _signalService = inject(SignalService);
  injector: Injector = inject(Injector);

  title = 'angular-signals';
  searchTerm = signal('');
  debouncedSearchTerm = this.debouncedSignal(this.searchTerm, 300);
  signalTitle = signal<string>('first');
  message = signal('Hello');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.debouncedSearchTermEffect();
    this.messageEffect();
  }

  messageEffect() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        console.log(`message changed to: ${this.message()}`);
      }
    });
  }

  debouncedSearchTermEffect() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        console.log(
          `debouncedSearchTerm changed to: ${this.debouncedSearchTerm()}`
        );
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.signalTitle.update((prevValue: string) => {
        return `Updated: ${prevValue + ' 1'}`;
      });
      this._signalService.changePrice(10);
      this.message.set('Hi');
    }, 3000);
    this.SearchTermEffect();
  }

  SearchTermEffect() {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        console.log('search term: ' + this.searchTerm());
      });
    });
  }

  debouncedSignal<T>(
    sourceSignal: Signal<T>,
    debounceTimeInMs = 300
  ): Signal<T> {
    const debounceSignal = signal(sourceSignal());

    effect(
      (onCleanup) => {
        const value = sourceSignal();
        const timeout = setTimeout(
          () => debounceSignal.set(value),
          debounceTimeInMs
        );

        onCleanup(() => clearTimeout(timeout)); // Cleanup previous timeout
      },
      { allowSignalWrites: true }
    );

    return debounceSignal;
  }
}
