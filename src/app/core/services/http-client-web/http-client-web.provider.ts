import { Injectable } from '@angular/core';
import { HttpClientProvider } from '../http-client/http-client.provider';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpClientWebProvider extends HttpClientProvider {
  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  /**
   * Overrides the base class method to fetch an image from the specified URL.
   *
   * @param url The URL from which to fetch the image.
   * @returns An Observable that emits a Blob object representing the image.
   */
  public override getImage(url: string): Observable<Blob> {
    return this.httpClient.get(url, { responseType: 'blob' });
  }

  /**
   * Overrides the base class method to perform an HTTP GET request.
   *
   * @param url The URL to send the GET request to.
   * @param params Parameters to include in the request.
   * @param headers HTTP headers to include in the request.
   * @returns An Observable that emits the response data of type T.
   */
  public override get<T>(
    url: string,
    params: any,
    headers: any
  ): Observable<T> {
    return this.httpClient.get<T>(url, {
      params: new HttpParams({ fromObject: params }),
      headers: this.createHeaders(headers),
    });
  }

  /**
   * Overrides the base class method to perform an HTTP POST request.
   *
   * @param url The URL to send the POST request to.
   * @param body The request body.
   * @param headers HTTP headers to include in the request.
   * @param urlEncoded Whether to encode the request in URL-encoded format (optional).
   * @returns An Observable that emits the response data of type T.
   */
  public override post<T>(
    url: string,
    body: any = {},
    headers: any = {},
    urlEncoded: boolean = false
  ): Observable<T> {
    return this.httpClient.post<T>(url, this.createBody(body, urlEncoded), {
      headers: this.createHeaders(headers, urlEncoded),
    });
  }

  /**
   * Overrides the base class method to perform an HTTP PUT request.
   *
   * @param url The URL to send the PUT request to.
   * @param body The request body.
   * @param headers HTTP headers to include in the request.
   * @param urlEncoded Whether to encode the request in URL-encoded format (optional).
   * @returns An Observable that emits the response data of type T.
   */
  public override put<T>(
    url: string,
    body: any = {},
    headers: any = {},
    urlEncoded: boolean = false
  ): Observable<T> {
    return this.httpClient.put<T>(url, this.createBody(body, urlEncoded), {
      headers: this.createHeaders(headers, urlEncoded),
    });
  }

  /**
   * Overrides the base class method to perform an HTTP PATCH request.
   *
   * @param url The URL to send the PATCH request to.
   * @param body The request body.
   * @param headers HTTP headers to include in the request.
   * @param urlEncoded Whether to encode the request in URL-encoded format (optional).
   * @returns An Observable that emits the response data of type T.
   */
  public override patch<T>(
    url: string,
    body: any,
    headers: any,
    urlEncoded: boolean = false
  ): Observable<T> {
    if (body instanceof FormData) {
      return this.httpClient.patch<T>(url, body, { headers: headers });
    }
    return this.httpClient.patch<T>(url, this.createBody(body, urlEncoded), {
      headers: this.createHeaders(headers, urlEncoded),
    });
  }

  /**
   * Overrides the base class method to perform an HTTP DELETE request.
   *
   * @param url The URL to send the DELETE request to.
   * @param params Parameters to include in the request.
   * @param headers HTTP headers to include in the request.
   * @returns An Observable that emits the response data of type T.
   */
  public override delete<T>(
    url: string,
    params: any,
    headers: any
  ): Observable<T> {
    return this.httpClient.delete<T>(url, {
      params: new HttpParams({ fromObject: params }),
      headers: this.createHeaders(headers),
    });
  }

  /**
   * Overrides the base class method to set the server trust mode for HTTP requests.
   *
   * @param mode The server trust mode to set ('default', 'nocheck', 'pinned', 'legacy').
   */
  public override setServerTrustMode(
    mode: 'default' | 'nocheck' | 'pinned' | 'legacy'
  ): void {}

  /**
   * Creates and returns HTTP headers based on the provided body and URL-encoded flag.
   *
   * @param body The request body or parameters.
   * @param urlEncoded Whether to encode the request in URL-encoded format (optional).
   * @returns HttpHeaders or HttpParams based on the URL-encoded flag.
   */
  private createHeaders(
    headers: any,
    urlEncoded: boolean = false
  ): HttpHeaders {
    var _headers = new HttpHeaders(headers);
    if (urlEncoded) {
      _headers.set('Accept', ' application/x-www-form-urlencoded');
    }
    return _headers;
  }

  /**
   * Creates and returns the request body based on the provided body and URL-encoded flag.
   *
   * @param body The request body or parameters.
   * @param urlEncoded Whether to encode the request in URL-encoded format.
   * @returns The request body as HttpParams or the original body.
   */
  private createBody(body: any, urlEncoded: boolean): any | HttpParams {
    return urlEncoded ? new HttpParams({ fromObject: body }) : body;
  }
}
