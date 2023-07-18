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
 * @TableName documentversion
 */
@TableName(value ="documentversion")
@Data
public class DocumentVersion implements Serializable {
    /**
     * 
     */
    @TableId
    private String versionno;

    /**
     * 
     */
    private String id;

    /**
     * 
     */
    private String masterid;

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
    private String name;

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
    private Integer code;

    /**
     * 
     */
    private String docform;

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
    private String note;

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
        DocumentVersion other = (DocumentVersion) that;
        return (this.getVersionno() == null ? other.getVersionno() == null : this.getVersionno().equals(other.getVersionno()))
            && (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getMasterid() == null ? other.getMasterid() == null : this.getMasterid().equals(other.getMasterid()))
            && (this.getModifytime() == null ? other.getModifytime() == null : this.getModifytime().equals(other.getModifytime()))
            && (this.getModifyuser() == null ? other.getModifyuser() == null : this.getModifyuser().equals(other.getModifyuser()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getLifestyle() == null ? other.getLifestyle() == null : this.getLifestyle().equals(other.getLifestyle()))
            && (this.getSecuritylevel() == null ? other.getSecuritylevel() == null : this.getSecuritylevel().equals(other.getSecuritylevel()))
            && (this.getCode() == null ? other.getCode() == null : this.getCode().equals(other.getCode()))
            && (this.getDocform() == null ? other.getDocform() == null : this.getDocform().equals(other.getDocform()))
            && (this.getCreatetime() == null ? other.getCreatetime() == null : this.getCreatetime().equals(other.getCreatetime()))
            && (this.getCreateuser() == null ? other.getCreateuser() == null : this.getCreateuser().equals(other.getCreateuser()))
            && (this.getNote() == null ? other.getNote() == null : this.getNote().equals(other.getNote()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getVersionno() == null) ? 0 : getVersionno().hashCode());
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getMasterid() == null) ? 0 : getMasterid().hashCode());
        result = prime * result + ((getModifytime() == null) ? 0 : getModifytime().hashCode());
        result = prime * result + ((getModifyuser() == null) ? 0 : getModifyuser().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getLifestyle() == null) ? 0 : getLifestyle().hashCode());
        result = prime * result + ((getSecuritylevel() == null) ? 0 : getSecuritylevel().hashCode());
        result = prime * result + ((getCode() == null) ? 0 : getCode().hashCode());
        result = prime * result + ((getDocform() == null) ? 0 : getDocform().hashCode());
        result = prime * result + ((getCreatetime() == null) ? 0 : getCreatetime().hashCode());
        result = prime * result + ((getCreateuser() == null) ? 0 : getCreateuser().hashCode());
        result = prime * result + ((getNote() == null) ? 0 : getNote().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", versionno=").append(versionno);
        sb.append(", id=").append(id);
        sb.append(", masterid=").append(masterid);
        sb.append(", modifytime=").append(modifytime);
        sb.append(", modifyuser=").append(modifyuser);
        sb.append(", name=").append(name);
        sb.append(", lifestyle=").append(lifestyle);
        sb.append(", securitylevel=").append(securitylevel);
        sb.append(", code=").append(code);
        sb.append(", docform=").append(docform);
        sb.append(", createtime=").append(createtime);
        sb.append(", createuser=").append(createuser);
        sb.append(", note=").append(note);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}