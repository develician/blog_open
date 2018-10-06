//
//  Model.swift
//  Blog
//
//  Created by killi8n on 2018. 8. 12..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import UIKit
import RxDataSources

struct Model {}

extension Model {
    struct Post: Codable, Equatable, IdentifiableType {
        let _id: String
        let title: String
        let body: String
        let thumbnail: String
        let tags: [String]
        let category: String
        let isTemporary: Bool
        let __v: Int
        let publishedDate: Date?
        
        enum CodingKeys: String, CodingKey {
            case _id
            case title
            case body
            case thumbnail
            case tags
            case category
            case isTemporary
            case __v
            case publishedDate
        }
        
        static func ==(lhs: Model.Post, rhs: Model.Post) -> Bool {
            return lhs._id == rhs._id
        }
        
        var identity: String {
            return _id
        }
    }
    
    struct Category: Codable {
        
        let category: String
        let subCategory: [String]
        let _id: String
        
        enum CodingKeys: String, CodingKey {
            case category
            case subCategory
            case _id
            
        }
        
    }
}


