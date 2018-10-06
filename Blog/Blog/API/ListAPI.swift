//
//  Router.swift
//  Blog
//
//  Created by killi8n on 2018. 8. 12..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import RxSwift
import Alamofire
import RxAlamofire

enum ListAPI {
    case getList(page: Int, tag: String?, category: String?)
    
}

extension ListAPI {
    
    var path: String {
        switch self {
        case .getList:
            return "/api/post"
        }
    }
    
    var query: String {
        switch self {
        case let .getList(page, tag, category):
            if let tag = tag {
                return "page=\(page)&tag=\(tag)"
            }
            if let category = category {
                return "page=\(page)&category=\(category)"
            }
            return "page=\(page)"
        }
    }
    
    var url: URL {
        var urlComponents = URLComponents(string: Constants.shared.baseURL)
        urlComponents?.path = path
        urlComponents?.query = query
        let url = (try? urlComponents?.asURL())!
        return url!
    }
    
    var method: HTTPMethod {
        switch self {
        case .getList:
            return .get
        }
    }
    
    var parameterEncoding: ParameterEncoding {
        switch self {
        case .getList:
            return URLEncoding.default
        }
    }
    
    
    
    static var defaultHeaders: HTTPHeaders {
        let headers: HTTPHeaders = [:]
        return headers
    }
    
    
    static let manager: Alamofire.SessionManager = {
        let configuration = URLSessionConfiguration.default
        configuration.timeoutIntervalForRequest = 5
        configuration.timeoutIntervalForResource = 5
        configuration.httpCookieStorage = HTTPCookieStorage.shared
        configuration.urlCache = URLCache(memoryCapacity: 0, diskCapacity: 0, diskPath: nil)
        let manager = Alamofire.SessionManager(configuration: configuration)
        return manager
    }()
    
    func buildRequestForList(parameters: Parameters) -> Observable<(Data, Int)> {
        return Observable<(Data, Int)>.create({ (observer) -> Disposable in
            let request = ListAPI.manager.request(self.url, method: self.method, parameters: parameters, encoding: self.parameterEncoding, headers: ListAPI.defaultHeaders)
                .validate(statusCode: 200 ..< 300)
                .responseJSON(completionHandler: { (response) in
                    switch response.result {
                    case .success(_):
                        guard let data = response.data else { return }
                        guard let lastPageString = response.response?.allHeaderFields["Last-Page"] as? String else { return }
                        
                        guard let lastPageInt = Int(lastPageString) else { return }

                        observer.onNext((data, lastPageInt))
                        observer.onCompleted()
                    case .failure(let error):
                        let alert = UIAlertController(title: "error",
                                                      message: error.localizedDescription,
                                                      preferredStyle: .alert)
                        alert.addAction(UIAlertAction(title: "ok", style: .cancel, handler: nil))
                        App.delegate.window?.rootViewController?
                            .present(alert, animated: true, completion: nil)
                        observer.onError(error)
                    }
                })
            return Disposables.create {
                request.cancel()
            }
        })
        
    }
}
