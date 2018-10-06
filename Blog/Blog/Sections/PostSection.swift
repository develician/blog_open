//
//  PostSection.swift
//  Blog
//
//  Created by killi8n on 2018. 9. 3..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import RxDataSources

typealias PostSectionModel = AnimatableSectionModel<Int, Model.Post>
typealias PostDataSource = RxCollectionViewSectionedAnimatedDataSource<PostSectionModel>

