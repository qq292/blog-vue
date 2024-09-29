import Cherry from 'cherry-markdown';


export function MD(id,isPreview){
    const codeId = 'code-'+id
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const md = new Cherry({
        toolbars: {
            toc: {
                updateLocationHash: false, // 要不要更新URL的hash
                defaultModel: 'full', // pure: 精简模式/缩略模式，只有一排小点； full: 完整模式，会展示所有标题
                showAutoNumber: false, // 是否显示自增序号
                position: 'fixed', // 悬浮目录的悬浮方式。当滚动条在cherry内部时，用absolute；当滚动条在cherry外部时，用fixed
                cssText: '', // 自定义样式
            },
            toolbarRight: ['fullScreen', '|', 'codeTheme', 'theme', '|', 'export'],
            toolbar: [
                isMobile ? 'switchModel' : 'togglePreview',
                isMobile ? undefined : 'switchModel', '|',
                // 把字体样式类按钮都放在加粗按钮下面
                { bold: ['size', 'bold', 'italic', 'underline', 'strikethrough', 'sub', 'sup', 'ruby'] },
                'color', '|', isMobile ? undefined : 'header', 'list',
                'panel',
                '|',
                // 把插入类按钮都放在插入按钮下面
                { insert: ['image', 'audio', 'video', 'link', 'hr', 'br', 'code', 'formula', 'toc', 'table', 'detail',] },
                'graph', isMobile ? undefined : 'justify',

            ]
        },

        callback: {
            changeString2Pinyin: function (value) {
                return value
                // return pinyin(value, { toneType: "none" });
            }
        },
        themeNameSpace: "dark",
        isPreviewOnly: isPreview,
        id: id,
        // value: md_text,
        event: {
            afterChange: function (value) {
                if (isPreview) { return }
                // store.md_text = value;
            },

        },
        editor: {
            id: codeId, // textarea 的id属性值
            name: codeId, // textarea 的name属性值
            theme: "dark",
            defaultModel: "editOnly",
            writingStyle: "normal",

        },
        engine: {
            syntax: {
                codeBlock: {
                    wrap: false,
                    lineNumber: !isMobile,
                    expandCode: true
                },
                toc: {
                    allowMultiToc: true,
                    showAutoNumber: true
                },
            }
        },
        previewer: {
            className: 'cherry-markdown',
            // 是否启用预览区域编辑能力（目前支持编辑图片尺寸、编辑表格内容）
            enablePreviewerBubble: !isPreview,
        }
    });

    return {md};

}