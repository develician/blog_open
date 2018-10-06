//
//  TagCell.swift
//  Blog
//
//  Created by killi8n on 2018. 9. 5..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import UIKit
import SnapKit
import Then
import RxSwift
import RxCocoa

class TagCell: UICollectionViewCell {
    
    var disposeBag: DisposeBag = DisposeBag()
    
    var tagRelay: BehaviorRelay<String> = BehaviorRelay(value: "")
    
    let tagButton = UIButton(type: .system).then {
        $0.titleLabel?.font = UIFont.systemFont(ofSize: 14, weight: UIFont.Weight.bold)
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.contentView.backgroundColor = .white
        self.contentView.addSubview(self.tagButton)
        
        self.bind()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        self.tagButton.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.centerY.equalToSuperview()
        }
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

extension TagCell {

    func update(tag: String) {
        self.tagButton.setTitle("#\(tag)", for: UIControlState.normal)
        self.tagRelay.accept(tag)
    }
    
    func bind() {
        self.tagButton.rx.tap.subscribe(onNext: { _ in
            let listService: ListServiceType = ListService()
            let listReactor = ListReactor(listService: listService)
            let tag = self.tagRelay.value
            let tagView = ListViewController(reactor: listReactor, tag: tag, category: nil, title: tag)
            guard let rootNavi = App.delegate.window?.rootViewController as? UINavigationController else { return }
            rootNavi.pushViewController(tagView, animated: true)
        }).disposed(by: self.disposeBag)
    }
    

}



