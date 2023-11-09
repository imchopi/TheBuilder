import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpClientProvider {
  constructor() {}

  /**
   * Obtains an image from a given URL.
   *
   * @param url The URL from which to obtain the image.
   * @returns An Observable that emits a Blob object containing the binary data of the image.
   */
  public abstract getImage(url: string): Observable<Blob>;

  /**
   * Performs an HTTP GET request.
   *
   * @param url The URL to send the GET request to.
   * @param params Parameters to include in the request.
   * @param headers HTTP headers to include in the request.
   * @returns An Observable that emits the response data of type T.
   */
  public abstract get<T>(url: string, params: any, headers: any): Observable<T>;

  /**
   * Performs an HTTP POST request.
   *
   * @param url The URL to send the POST request to.
   * @param params Parameters to include in the request.
   * @param headers HTTP headers to include in the request.
   * @param urlEncoded Whether to encode the request in URL-encoded format (optional).
   * @returns An Observable that emits the response data of type T.
   */
  public abstract post<T>(
    url: string,
    params: any,
    headers: any,
    urlEncoded?: boolean
  ): Observable<T>;

  /**
   * Performs an HTTP PUT request.
   *
   * @param url The URL to send the PUT request to.
   * @param params Parameters to include in the request.
   * @param headers HTTP headers to include in the request.
   * @param urlEncoded Whether to encode the request in URL-encoded format (optional).
   * @returns An Observable that emits the response data of type T.
   */
  public abstract put<T>(
    url: string,
    params: any,
    headers: any,
    urlEncoded?: boolean
  ): Observable<T>;

  /**
   * Performs an HTTP PATCH request.
   *
   * @param url The URL to send the PATCH request to.
   * @param body The request body to include in the request.
   * @param headers HTTP headers to include in the request.
   * @param urlEncoded Whether to encode the request in URL-encoded format (optional).
   * @returns An Observable that emits the response data of type T.
   */
  public abstract patch<T>(
    url: string,
    body: any,
    headers: any,
    urlEncoded?: boolean
  ): Observable<T>;

  /**
   * Performs an HTTP DELETE request.
   *
   * @param url The URL to send the DELETE request to.
   * @param params Parameters to include in the request.
   * @param headers HTTP headers to include in the request.
   * @returns An Observable that emits the response data of type T.
   */
  public abstract delete<T>(
    url: string,
    params: any,
    headers: any
  ): Observable<T>;
  
  /**
   * Sets the server trust mode for HTTP requests.
   *
   * @param mode The server trust mode to set ('default', 'nocheck', 'pinned', 'legacy').
   */

  public abstract setServerTrustMode(
    mode: 'default' | 'nocheck' | 'pinned' | 'legacy'
  ): void;
}
