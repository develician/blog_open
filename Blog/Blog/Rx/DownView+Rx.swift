//
//  DownView+Rx.swift
//  Blog
//
//  Created by killi8n on 2018. 9. 5..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import Down
import RxSwift
import RxCocoa

extension Reactive where Base: DownView {
    func setDownView(post: Model.Post) {
        try? self.base.update(markdownString: post.body)
    }
}
