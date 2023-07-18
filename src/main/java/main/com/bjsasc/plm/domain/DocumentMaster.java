package main.com.bjsasc.plm.domain;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * @TableName documentmaster
 */
@TableName(value ="documentmaster")
@Data
public class DocumentMaster implements Serializable {
    /**
     * 
     */
    @TableId
    private String id;

    /**
     * 
     */
    private String name;

    /**
     * 
     */
    private String checkstatus;

    /**
     * 
     */
    private Integer code;

    /**
     * 
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:SS")
    private Date createtime;

    /**
     * 
     */
    private String createuser;

    /**
     * 
     */
    private String docform;

    /**
     * 
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:SS")
    private Date modifytime;

    /**
     * 
     */
    private String modifyuser;

    /**
     * 
     */
    private Object lifestyle;

    /**
     * 
     */
    private Object securitylevel;

    /**
     * 
     */
    private String versionno;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        DocumentMaster other = (DocumentMaster) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getCheckstatus() == null ? other.getCheckstatus() == null : this.getCheckstatus().equals(other.getCheckstatus()))
            && (this.getCode() == null ? other.getCode() == null : this.getCode().equals(other.getCode()))
            && (this.getCreatetime() == null ? other.getCreatetime() == null : this.getCreatetime().equals(other.getCreatetime()))
            && (this.getCreateuser() == null ? other.getCreateuser() == null : this.getCreateuser().equals(other.getCreateuser()))
            && (this.getDocform() == null ? other.getDocform() == null : this.getDocform().equals(other.getDocform()))
            && (this.getModifytime() == null ? other.getModifytime() == null : this.getModifytime().equals(other.getModifytime()))
            && (this.getModifyuser() == null ? other.getModifyuser() == null : this.getModifyuser().equals(other.getModifyuser()))
            && (this.getLifestyle() == null ? other.getLifestyle() == null : this.getLifestyle().equals(other.getLifestyle()))
            && (this.getSecuritylevel() == null ? other.getSecuritylevel() == null : this.getSecuritylevel().equals(other.getSecuritylevel()))
            && (this.getVersionno() == null ? other.getVersionno() == null : this.getVersionno().equals(other.getVersionno()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getCheckstatus() == null) ? 0 : getCheckstatus().hashCode());
        result = prime * result + ((getCode() == null) ? 0 : getCode().hashCode());
        result = prime * result + ((getCreatetime() == null) ? 0 : getCreatetime().hashCode());
        result = prime * result + ((getCreateuser() == null) ? 0 : getCreateuser().hashCode());
        result = prime * result + ((getDocform() == null) ? 0 : getDocform().hashCode());
        result = prime * result + ((getModifytime() == null) ? 0 : getModifytime().hashCode());
        result = prime * result + ((getModifyuser() == null) ? 0 : getModifyuser().hashCode());
        result = prime * result + ((getLifestyle() == null) ? 0 : getLifestyle().hashCode());
        result = prime * result + ((getSecuritylevel() == null) ? 0 : getSecuritylevel().hashCode());
        result = prime * result + ((getVersionno() == null) ? 0 : getVersionno().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", name=").append(name);
        sb.append(", checkstatus=").append(checkstatus);
        sb.append(", code=").append(code);
        sb.append(", createtime=").append(createtime);
        sb.append(", createuser=").append(createuser);
        sb.append(", docform=").append(docform);
        sb.append(", modifytime=").append(modifytime);
        sb.append(", modifyuser=").append(modifyuser);
        sb.append(", lifestyle=").append(lifestyle);
        sb.append(", securitylevel=").append(securitylevel);
        sb.append(", versionno=").append(versionno);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}