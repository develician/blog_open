//
//  NVActivityIndicatorView+Rx.swift
//  Blog
//
//  Created by killi8n on 2018. 9. 4..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import RxCocoa
import RxSwift
import NVActivityIndicatorView

extension Reactive where Base: NVActivityIndicatorView {
    var isAnimating: Binder<Bool> {
        return Binder(self.base) { (nvActivityIndicatorView, isAnimating) in
            if isAnimating {
                nvActivityIndicatorView.startAnimating()
            } else {
                nvActivityIndicatorView.stopAnimating()
            }
        }
    }
}
