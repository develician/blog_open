//
//  BaseViewController.swift
//  Blog
//
//  Created by killi8n on 2018. 9. 3..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import UIKit

import RxSwift


class BaseViewController: UIViewController {

    init() {
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    var disposeBag: DisposeBag = DisposeBag()
    
    private(set) var didSetupConstraints = false
    
    override func viewDidLoad() {
        self.view.setNeedsUpdateConstraints()
    }
    
    override func updateViewConstraints() {
        if !self.didSetupConstraints {
            self.setupConstraints()
            self.didSetupConstraints = true
        }
        super.updateViewConstraints()
    }
    
    func setupConstraints() {
        //        override
    }


}
