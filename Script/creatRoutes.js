const fs = require('fs');
const path = require('path');

// 指定目录路径
const folderPath = '../public/md/bare-metal'; // 实际文件夹路径
const routesOutputPath = '_scriptRoutes.js'; // 路由配置输出文件路径
const navigationOutputPath = '_navigationLinks.html'; // 导航链接输出文件路径
const articlesListOutputPath = '_articlesList.html';
const directoryStructureOutputPath = '_directoryStructure.json';
const jsonEnOutputPath = '_i18n-en.json'; // 英文JSON输出文件路径
const jsonZhOutputPath = '_i18n-zh.json'; // 中文JSON输出文件路径

// 初始化两个空字符串来累积结果
let routesResult = '';
let navigationResult = '';

let articlesListResult = '<ul class="list-disc list-inside">';
let directoryStructure = {
    "bareMetal": [] // 使用书籍ID作为键
};
// 初始化英文和中文JSON对象
let jsonEn = {};
let jsonZh = {};

// 初始化一个Set来跟踪已经处理过的基本名称
let processedBaseNames = new Set();

fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Unable to read directory: ' + err);
        return;
    }

    files.filter(file => file.endsWith('.md')).forEach(file => {
        const baseName = file.replace(/\.zh\.md$|\.en\.md$/, '');

        if (processedBaseNames.has(baseName)) {
            return;
        }
        processedBaseNames.add(baseName);

        const routePath = `/:lang/blog/${path.basename(folderPath)}/${baseName}`;
        const filePath = `/md/${path.basename(folderPath)}/${baseName}.md`;
        const i18nKey = `bareMetal.${baseName}`; // i18n的键

        // 构建路由配置字符串，现在只传入i18nKey和filePath
        routesResult += `{
    path: "${routePath}",
    element: <MarkdownPage
        i18nKey="${i18nKey}"
        filePath="${filePath}"
    />,
},\n`;

        // 构建导航链接HTML字符串，仍然使用i18nKey来生成占位符
        navigationResult += `<div className="flex bg-base-300 h-28 mb-2 md:mb-0">
    <div className="flex-grow flex justify-between items-center m-4">
        <div>
            <Link to={\`/\${currentLang}/blog/bare-metal/${baseName}\`}>
                <h3 className="text-xl overflow-hidden line-clamp-1 hover:underline mb-2">{i18n.t('${i18nKey}.title')}</h3>
            </Link>
            <p className="overflow-hidden line-clamp-2">{i18n.t('${i18nKey}.description')}</p>
        </div>
    </div>
</div>\n`;

        // 更新英文和中文JSON对象
        jsonEn[i18nKey] = {
            title: `${baseName.replace(/-/g, ' ')} - bare metal`,
            description: "" // 英文描述留空，可根据需要填写
        };
        jsonZh[i18nKey] = {
            title: "", // 中文标题留空
            description: "" // 中文描述留空
        };

        const articleLink = `/\${currentLang}/blog/bare-metal/${baseName}`;
        articlesListResult += `
            <Link to="${articleLink}">
                <li class="text-base mb-2 hover:underline">{i18n.t('${i18nKey}.title')}</li>
            </Link>`;

        directoryStructure["bareMetal"].push({
            i18nKey: `bareMetal.${baseName}`,
            path: `/bare-metal/${baseName}`
        });
    });

    articlesListResult += '</ul>';
    // 将路由配置结果、导航链接结果和国际化JSON对象写入到文件
    fs.writeFileSync(routesOutputPath, routesResult);
    fs.writeFileSync(navigationOutputPath, navigationResult);
    fs.writeFileSync(jsonEnOutputPath, JSON.stringify(jsonEn, null, 2));
    fs.writeFileSync(jsonZhOutputPath, JSON.stringify(jsonZh, null, 2));
    fs.writeFileSync(articlesListOutputPath, articlesListResult);
    fs.writeFileSync(directoryStructureOutputPath, JSON.stringify(directoryStructure, null, 2));

    console.log(`Routes configuration has been saved to ${routesOutputPath}`);
    console.log(`Navigation links have been saved to ${navigationOutputPath}`);
    console.log(`English JSON has been saved to ${jsonEnOutputPath}`);
    console.log(`Chinese JSON has been saved to ${jsonZhOutputPath}`);
    console.log(`Articles list has been saved to ${articlesListOutputPath}`);
    console.log(`Directory structure has been saved to ${directoryStructureOutputPath}`);
});
