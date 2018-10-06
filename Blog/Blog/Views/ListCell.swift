//
//  ListCollectionViewCell.swift
//  Blog
//
//  Created by killi8n on 2018. 8. 12..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import UIKit
import SnapKit
import CGFloatLiteral
import Kingfisher
import RxSwift
import RxCocoa
import ReusableKit

class ListCell: UICollectionViewCell {
    
    struct Constant {
        static let titleLabelNumberOfLines = 3
        static let bodyLabelNumberOfLines = 4
        static let dateLabelNumberOfLines = 1
        
        static let dateLabelHeight = 20.f
    }
    
    struct Metric {
        static let cellPadding = 15.f
        static let thumbnailViewBound = 70.f
        static let tagCollectionViewHeight = 30.f
    }
    
    struct Font {
        static let titleLabelFont = UIFont.systemFont(ofSize: 20, weight: UIFont.Weight.semibold)
        static let bodyLabelFont = UIFont.systemFont(ofSize: 14, weight: UIFont.Weight.light)
        static let dateLabel = UIFont.systemFont(ofSize: 18, weight: UIFont.Weight.ultraLight)
    }
    
    struct Color {
        static let reviewTextLabel = UIColor.black
    }
    
    struct Reusable {
        static let tagCell = ReusableCell<TagCell>()
    }

    
    var disposeBag: DisposeBag = DisposeBag()
    var tags: BehaviorRelay<[String]> = BehaviorRelay(value: [])
    
    let titleLabel: UILabel = {
        let label = UILabel()
        label.numberOfLines = Constant.titleLabelNumberOfLines
        label.sizeToFit()
        label.font = Font.titleLabelFont
        label.lineBreakMode = .byWordWrapping
        //        label.backgroundColor = .blue
        return label
    }()
    
    let bodyLabel: UILabel = {
        let label = UILabel()
        label.numberOfLines = Constant.bodyLabelNumberOfLines
        label.sizeToFit()
        label.font = Font.bodyLabelFont
        label.textAlignment = NSTextAlignment.left
        label.lineBreakMode = NSLineBreakMode.byTruncatingTail
        //        label.backgroundColor = .orange
        return label
    }()
    
    let dateLabel: UILabel = {
        let label = UILabel()
        label.font = Font.dateLabel
        label.numberOfLines = Constant.dateLabelNumberOfLines
        return label
    }()
    
    let separator: UIView = {
        let view = UIView()
        view.backgroundColor = .lightGray
        return view
    }()
    

    let thumbnailView = UIImageView().then {
        $0.backgroundColor = UIColor.black
        $0.clipsToBounds = true
        $0.layer.cornerRadius = 5
        $0.contentMode = UIViewContentMode.scaleAspectFill
    }
    
    let categoryButton = UIButton(type: .system)
    
    let layout: UICollectionViewFlowLayout = UICollectionViewFlowLayout().then {
        $0.scrollDirection = .horizontal
//        $0.minimumLineSpacing = 32
    }

    lazy var tagCollectionView = UICollectionView(frame: .zero, collectionViewLayout: self.layout).then { (collectionView) in
        collectionView.register(Reusable.tagCell)
        collectionView.backgroundColor = .white
        collectionView.delegate = self
        collectionView.dataSource = self
        
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        self.contentView.backgroundColor = .white
        self.contentView.addSubview(self.titleLabel)
        self.contentView.addSubview(self.bodyLabel)
        self.contentView.addSubview(self.thumbnailView)
        
        self.contentView.addSubview(self.dateLabel)
        self.contentView.addSubview(self.categoryButton)
        
        self.contentView.addSubview(self.tagCollectionView)

        self.contentView.layer.cornerRadius = 5
        self.contentView.layer.masksToBounds = true
        self.layer.shadowColor = UIColor.black.cgColor
        self.layer.shadowOffset = CGSize(width: 0, height: 2.0)
        self.layer.shadowRadius = 2.0
        self.layer.shadowOpacity = 0.5
        self.layer.masksToBounds = false
        self.layer.shadowPath = UIBezierPath(roundedRect: self.bounds, cornerRadius: self.contentView.layer.cornerRadius).cgPath
        
        bind()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        
        self.titleLabel.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(Metric.cellPadding)
            make.left.equalToSuperview().offset(Metric.cellPadding)
            make.right.equalToSuperview().offset(-Metric.cellPadding)
        }
        
        self.bodyLabel.snp.makeConstraints { (make) in
            make.top.equalTo(titleLabel.snp.bottom).offset(16)
            make.left.equalToSuperview().offset(Metric.cellPadding)
            make.right.equalToSuperview().offset(-(Metric.cellPadding * 2 + Metric.thumbnailViewBound))
        }
        
        self.thumbnailView.snp.makeConstraints { (make) in
            make.centerY.equalTo(self.bodyLabel.snp.centerY)
            make.width.equalTo(Metric.thumbnailViewBound)
            make.left.equalTo(self.bodyLabel.snp.right).offset(Metric.cellPadding)
            make.right.equalToSuperview().offset(-Metric.cellPadding)
            make.height.equalTo(Metric.thumbnailViewBound)
        }
        
        
        
        //
        self.dateLabel.snp.makeConstraints { (make) in
            make.top.equalTo(self.thumbnailView.snp.bottom).offset(Metric.cellPadding)
            make.left.equalTo(contentView.snp.left).offset(Metric.cellPadding)
            make.height.equalTo(Constant.dateLabelHeight)
//            make.bottom.equalTo(self.contentView.snp.bottom).offset(-Metric.cellPadding)
        }
        
        self.categoryButton.snp.makeConstraints { (make) in
            make.top.equalTo(self.thumbnailView.snp.bottom).offset(Metric.cellPadding)
            make.right.equalToSuperview().offset(-Metric.cellPadding)
            make.height.equalTo(Constant.dateLabelHeight)
//            make.bottom.equalTo(self.contentView.snp.bottom).offset(-Metric.cellPadding)
            
        }
        
        self.tagCollectionView.snp.makeConstraints { (make) in
            make.top.equalTo(self.categoryButton.snp.bottom).offset(Metric.cellPadding)
            make.bottom.equalToSuperview().offset(-Metric.cellPadding)
            make.left.equalToSuperview().offset(Metric.cellPadding)
            make.right.equalToSuperview().offset(-Metric.cellPadding)
            make.height.equalTo(Metric.tagCollectionViewHeight)
        }

        
        
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}



extension ListCell {

    func update(data post: Model.Post) {
        guard let url = URL(string: "\(Constants.shared.s3BaseURL)\(post.thumbnail)") else { return }
        self.thumbnailView.kf.setImage(with: url)
        self.titleLabel.text = post.title
        self.bodyLabel.text = String(post.body.filter { !"\n".contains($0) })
        self.dateLabel.text = post.publishedDate?.string(dateFormat: "yyyy-MM-dd")
        self.categoryButton.setTitle(post.category, for: UIControlState.normal)
        self.tags.accept(post.tags)
        self.tagCollectionView.reloadData()
    }

    func bind() {
        
        
        self.categoryButton.rx.tap.subscribe(onNext: { [weak self] _ in
            guard let rootNavi = App.delegate.window?.rootViewController as? UINavigationController else { return }
            
            let listService = ListService()
            let reactor = ListReactor(listService: listService)
            guard let category = self?.categoryButton.titleLabel?.text else { return }
            let categoryView = ListViewController(reactor: reactor, tag: nil, category: category, title: category)
            
            rootNavi.pushViewController(categoryView, animated: true)
        }).disposed(by: self.disposeBag)
    }
    
    static func heightForTitleLabel(fits width: CGFloat, titleText: String?) -> CGFloat {
        
        guard let height = titleText?.height(
            fits: Metric.cellPadding * 2,
            font: Font.titleLabelFont,
            maximumNumberOfLines: Constant.titleLabelNumberOfLines
            ) else { return 0 }
        return height + Metric.cellPadding
    }
    
    static func heightForBodyLabel(fits width: CGFloat, bodyText: String?) -> CGFloat {
        guard let height = bodyText?.height(
            fits: Metric.cellPadding * 2 + Metric.thumbnailViewBound,
            font: Font.bodyLabelFont,
            maximumNumberOfLines: Constant.bodyLabelNumberOfLines
            ) else { return 0 }
        return height + Metric.cellPadding
    }
    
    
}


extension ListCell: UICollectionViewDataSource {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        let tags = self.tags.value
        return tags.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeue(ListCell.Reusable.tagCell, for: indexPath)
        let tags = self.tags.value
        cell.update(tag: tags[indexPath.item])
    

        return cell
    }
}

extension ListCell: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        let tags = self.tags.value
        let targetTag = "#\(tags[indexPath.item])"
        return CGSize(width: targetTag.width(with: UIFont.systemFont(ofSize: 14, weight: UIFont.Weight.bold), maximumNumberOfLines: 1), height: collectionView.frame.height)
    }
    
}








