//
//  SideMenuCell.swift
//  Blog
//
//  Created by killi8n on 2018. 9. 5..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import UIKit
import SnapKit
import Then

class SideMenuCell: UITableViewCell {
    
    let sideMenuLabel = UILabel().then {
        $0.font = UIFont.systemFont(ofSize: 32, weight: UIFont.Weight.semibold)
    }

    override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        
        self.contentView.backgroundColor = .white
        
        self.contentView.addSubview(self.sideMenuLabel)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        let margins = self.contentView.layoutMargins
        self.sideMenuLabel.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(margins.top)
            make.left.equalToSuperview().offset(margins.left)
            make.bottom.equalToSuperview().offset(-margins.bottom)
            make.right.equalToSuperview().offset(-margins.right)
        }
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}
