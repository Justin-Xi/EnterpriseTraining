package main.com.bjsasc.plm.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import main.com.bjsasc.plm.domain.FileLink;
import org.springframework.stereotype.Repository;

/**
* @author 张赵东
* @description 针对表【filelink】的数据库操作Mapper
* @createDate 2023-07-17 15:30:59
* @Entity com.bjsasc.plm.domain.FileLink
*/

@Repository
public interface FileLinkMapper extends BaseMapper<FileLink> {

}




