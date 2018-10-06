//
//  LoadMoreCell.swift
//  Blog
//
//  Created by killi8n on 2018. 8. 12..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import UIKit
import RxSwift
import RxCocoa
import SnapKit
import Then
import NVActivityIndicatorView

class LoadMoreCell: UICollectionReusableView {
    
    let activityIndicator = NVActivityIndicatorView(frame: .zero, type: NVActivityIndicatorType.ballBeat, color: UIColor.black, padding: 32)
 
    lazy var doneDot: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.black
        view.layer.masksToBounds = true
        return view
    }()

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.backgroundColor = .clear
        self.addSubview(activityIndicator)
        self.addSubview(doneDot)
        self.activityIndicator.startAnimating()
    }
    
    
    override func layoutSubviews() {
        super.layoutSubviews()
        
        self.activityIndicator.snp.makeConstraints { [weak self] (make) in
            guard let `self` = self else {return}
            make.centerX.equalTo(self.snp.centerX)
            make.centerY.equalTo(self.snp.centerY)
        }
        
        self.doneDot.snp.makeConstraints { [weak self] (make) in
            guard let `self` = self else {return}
            make.centerX.equalTo(self.snp.centerX)
            make.centerY.equalTo(self.snp.centerY)
            make.width.equalTo(18)
            make.height.equalTo(18)
            
        }
        
        self.doneDot.layer.cornerRadius = 9
        self.doneDot.clipsToBounds = true
        self.doneDot.isHidden = true
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

extension LoadMoreCell {
    func load(_ load: Bool) {
        if load {
            self.activityIndicator.startAnimating()
        } else {
            self.activityIndicator.stopAnimating()
        }
        self.doneDot.isHidden = load
    }
}

