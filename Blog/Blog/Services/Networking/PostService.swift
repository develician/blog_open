//
//  PostService.swift
//  Blog
//
//  Created by killi8n on 2018. 9. 4..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import RxSwift
import Alamofire
import CodableAlamofire
import SwiftyJSON

protocol PostServiceType {
    var decoder: JSONDecoder { get }
    func readPost(id: String) -> Observable<Model.Post>
}

final class PostService: PostServiceType {
    
    var decoder: JSONDecoder {
        let decoder = JSONDecoder()
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        decoder.dateDecodingStrategy = .formatted(formatter)
        return decoder
    }
    
    func readPost(id: String) -> Observable<Model.Post> {
        let parameters: [String: Any] = [:]
        return PostAPI.readPost(id: id).buildRequest(parameters: parameters)
            .flatMap({ (data) -> Observable<Model.Post> in
                guard let post = try? self.decoder.decode(Model.Post.self, from: data) else {
                    return Observable.error(RxError.unknown)
                }
                
                return Observable.just(post)
            })
    }
}
