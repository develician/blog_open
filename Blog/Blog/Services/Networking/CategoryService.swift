//
//  CategoryService.swift
//  Blog
//
//  Created by killi8n on 2018. 9. 5..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import RxSwift
import Alamofire
import CodableAlamofire
import SwiftyJSON

protocol CategoryServiceType {
    var decoder: JSONDecoder { get }
    func getList() -> Observable<[Model.Category]>
}

final class CategoryService: CategoryServiceType {
    var decoder: JSONDecoder {
        let decoder = JSONDecoder()
        return decoder
    }
    
    func getList() -> Observable<[Model.Category]> {
        let parameters: [String: Any] = [:]
        return CategoryAPI.getList.buildRequest(parameters: parameters)
            .flatMap({ (data: Data) -> Observable<[Model.Category]> in
                guard let categories = try? self.decoder.decode([Model.Category].self, from: data) else { return Observable.error(RxError.unknown) }
                return Observable.just(categories)
            })
    }
    
    
}
