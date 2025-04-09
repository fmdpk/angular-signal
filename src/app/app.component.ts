import {
  Component,
  effect,
  Inject,
  inject,
  Injector,
  OnInit,
  PLATFORM_ID,
  Signal,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignalService } from './services/signal.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
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
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        alert(`Message changed to: ${this.message()}`);
        alert(`Message changed to: ${this.debouncedSearchTerm()}`);
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
