//
//  PostAPI.swift
//  Blog
//
//  Created by killi8n on 2018. 9. 4..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import RxSwift
import Alamofire
import RxAlamofire

enum PostAPI {
    case readPost(id: String)
}

extension PostAPI {
    var path: String {
        switch self {
        case let .readPost(id):
            return "/api/post/\(id)"
        }
    }
    
    var url: URL {
        var urlComponents = URLComponents(string: Constants.shared.baseURL)
        urlComponents?.path = path
        let url = (try? urlComponents?.asURL())!
        return url!
    }
    
    var method: HTTPMethod {
        switch self {
        case .readPost:
            return .get
        }
    }
    
    var parameterEncoding: ParameterEncoding {
        switch self {
        case .readPost:
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
        //        manager.startRequestsImmediately = false
        return manager
    }()
    
    func buildRequest(parameters: Parameters) -> Observable<Data> {
        return PostAPI.manager.rx
            .request(method, url, parameters: parameters, encoding: parameterEncoding, headers: PostAPI.defaultHeaders)
            .validate(statusCode: 200 ..< 300)
            .data()
            .observeOn(MainScheduler.instance)
            .do( onError: { (error) in
                let alert = UIAlertController(title: "error",
                                              message: error.localizedDescription,
                                              preferredStyle: .alert)
                alert.addAction(UIAlertAction(title: "ok", style: .cancel, handler: nil))
                App.delegate.window?.rootViewController?
                    .present(alert, animated: true, completion: nil)
            })
    }
}
