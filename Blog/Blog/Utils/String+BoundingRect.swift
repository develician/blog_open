//
//  String+BoundingRect.swift
//  ReactorKitApp
//
//  Created by killi8n on 2018. 9. 1..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import UIKit

extension String {
    
    func boundingRect(with size: CGSize, attributes: [NSAttributedStringKey: AnyObject]) -> CGRect {
        let rect = self.boundingRect(with: size,
                                     options: NSStringDrawingOptions.usesLineFragmentOrigin,
                                     attributes: attributes,
                                     context: nil)
        return snap(rect)
    }
    
    func size(fits size: CGSize, font: UIFont, maximumNumberOfLines: Int = 0) -> CGSize {
        let attributes = [NSAttributedStringKey.font: font]
        
        var size = self.boundingRect(with: size, attributes: attributes).size
        if maximumNumberOfLines > 0 {
            size.height = min(size.height, CGFloat(maximumNumberOfLines) * font.lineHeight)
        }
        return size
    }
    
    func width(with font: UIFont, maximumNumberOfLines: Int = 0) -> CGFloat {
        let size = CGSize(width: CGFloat.greatestFiniteMagnitude, height: CGFloat.greatestFiniteMagnitude)
        return self.size(fits: size, font: font, maximumNumberOfLines: maximumNumberOfLines).width
    }
    
    func height(fits width: CGFloat, font: UIFont, maximumNumberOfLines: Int = 0) -> CGFloat {
        let size = CGSize(width: width, height: CGFloat.greatestFiniteMagnitude)
        return self.size(fits: size, font: font, maximumNumberOfLines: maximumNumberOfLines).height
    }
    
}

