//
//  API.swift
//  Blog
//
//  Created by killi8n on 2018. 8. 12..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import RxSwift
import Alamofire
import SwiftyJSON

protocol ListServiceType {
    var decoder: JSONDecoder { get }
    func getList(page: Int, tag: String?, category: String?) -> Observable<([Model.Post], Int)>
}

final class ListService: ListServiceType {
    var decoder: JSONDecoder {
        let decoder = JSONDecoder()
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        decoder.dateDecodingStrategy = .formatted(formatter)
        return decoder
    }
    
    func getList(page: Int, tag: String?, category: String?) -> Observable<([Model.Post], Int)> {
        let parameters: [String: Any] = [:]
        return ListAPI.getList(page: page, tag: tag, category: category).buildRequestForList(parameters: parameters).flatMap({ (data, lastPage) -> Observable<([Model.Post], Int)> in
            print("data: \(data)")
            guard let posts = (try? self.decoder.decode([Model.Post].self, from: data)) else { return Observable.error(RxError.unknown) }
            return Observable.just((posts, lastPage))
        })
    }
    
}
